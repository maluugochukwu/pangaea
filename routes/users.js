const express = require('express')
const router = express.Router()
router.use(express.json())

router.get("/",(req,res)=>{
    res.json({message:"User Profile"})
})
router.post("/:id",(req,res)=>{
    res.json({message:req.params.id,body:req.body})
})
router.get("/:id/contacts",(req,res)=>{
    res.json({message:req.params.id+". These are your contacts"})
})

module.exports = router