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
              })
              .then(result=>res.json({url:req.body.url,topic:req.params.topic}))
              .catch(err=> res.json({message:`The url specified has already been used for ${req.params.topic}`}))
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
        if(Object.keys(req.body).length === 0 && req.body.constructor === Object )
        {
          res.json({code:403,message:"Kindly specify an object in the request body"})
        }
        else
        {
          console.log(req.body.length)
            subscribers.findAll({where:{topicName:req.params.topic}}).then((record)=>{
              if(record)
              {
                for (let x in record)
                {
                    axios.post(record[x].url, {topic:req.params.topic,data:req.body})
                    .then(function (response) {
                      
                    })
                    .catch(function (error) {
                      console.log(error);
                    });
                }
                res.json({code:200,message:"New topic published",status:"sent update on topic to subscribers",data:req.body})
              }
          })
        }
      }else
      {
        res.json({code:401,message:"Invalid topic"})
      }
    })
})
app.post('/topic/:topicName',(req,res)=>{
  topic.create({
    name:req.params.topicName
  }).then((data)=>{
    if(data)
    {
      res.json({message:`Hurray!!! ${req.params.topicName} is now a topic`})
    }else
    {
      res.json({message:`Could not add ${req.params.topicName} as a topic`})
    }
  }).catch(err=>res.json({message:`Topic name already exist`}))
})
app.listen(8000,()=>{
    console.log("server on port 8000 is up...")
})
