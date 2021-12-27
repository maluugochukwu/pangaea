require('dotenv').config()
const express = require('express')
const app = express()
const axios = require('axios').default;
var mysql = require('mysql');
app.use(express.json())
const verifyTopic = (topic)=>{
    // return true if the topic exist along with the urls that are mapped to the topic
    const result = runQuery("SELECT * FROM userdata");
    console.log(result);
}
const sendNotifications = (url,publishedData)=>{

}
const runQuery = (sql)=>{
    var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DATABASE
      });
    var output = "";
    con.connect(function(err) {
      if (err) throw err;
      con.query(sql, function (err, result,fields) {
        if (err) throw err;
        output =  result;
        return output;
      });
    });
}
app.post('/create',(req,res)=>{
    console.log({message:"Hello world",data:req.body})
})

app.post('/subscription/:topic',(req,res)=>{
    verifyTopic(req.params.topic);
    if(req.body.url != undefined)
    {
        // map url to topic
        res.json({"url":req.body.url,topic:req.params.topic})
    }else
    {
        res.json({"message":"No URL defined"})
    }
})
app.post('/publish/:topic',(req,res)=>{

    // check if topic exist, and send notification to urls that are subscribed to the topic and the body of published topic
    axios.post('http://localhost:9000/create', {
        firstName: 'Fred',
        lastName: 'Flintstone'
      })
      .then(function (response) {
        res.json({message:"New topic published",status:"sending update on topic to subscribers",topic:req.body})
      })
      .catch(function (error) {
        console.log(error);
      });
})

// ************** User Routes **************
const userRouter = require("./routes/users")
app.use("/user",userRouter)
// ************** END User Routes  **************

function myMidleware(req,res,next)
{
    console.log("here")
    next();
}

app.listen(3000,()=>{
    console.log("server on port 3000 is up...")
})
app.listen(9000,()=>{
    console.log("server on port 9000 is up...")
})