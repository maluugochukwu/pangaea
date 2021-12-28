require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())
const axios = require('axios').default;
const sequelize = require("./util/database")
const subscribers = require("./models/subscriber")
const topic = require("./models/topic")


sequelize.sync().then(result=>console.log("Table setup completed!")).catch((err)=>{console.log(err)})




app.post('/subscribe/:topic',(req,res)=>{
    topic.findByPk(req.params.topic).then((data)=>{
      if(data)
      {
          if(req.body.url != undefined)
          {
            subscribers.create({
                url:req.body.url,
                topicName:req.params.topic
              }).then(result=>res.json({url:req.body.url,topic:req.params.topic,data:result.createdAt}))
          }else
          {
              res.json({"message":"No URL defined"})
          }
      }
      else
      {
        res.json({message:"Invalid topic"})
      }
    })
})
app.post('/publish/:topic',(req,res)=>{
    topic.findByPk(req.params.topic).then((data)=>{
      if(data)
      {
        subscribers.findAll({where:{topicName:req.params.topic}}).then((record)=>{
            if(record)
            {
              for (let x in record)
              {
                  console.log(record[x].url)
                  axios.post(record[x].url, req.body)
                  .then(function (response) {
                    res.json({message:"New topic published",status:"sending update on topic to subscribers",topic:req.body})
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
              }
            }
        })
      }else
      {
        res.json({message:"Invalid topic"})
      }
    })
})

app.listen(8000,()=>{
    console.log("server on port 8000 is up...")
})
