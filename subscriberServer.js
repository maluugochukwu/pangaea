require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())



app.post('/:endpoint',(req,res)=>{
  
    console.log({message:"Hello world",data:req.body})
})



app.listen(9000,()=>{
    console.log("server on port 9000 is up...")
})
