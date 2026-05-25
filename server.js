const express = require("express")
const path = require("path")
const mongoose = require("mongoose")

const User = require("./models/User")

const app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))

mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
.then(()=>{
    console.log("MongoDB Connected")
})

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"views","login.html"))
})

app.get("/register",(req,res)=>{
    res.sendFile(path.join(__dirname,"views","register.html"))
})

app.get("/dashboard",(req,res)=>{
    res.sendFile(path.join(__dirname,"views","dashboard.html"))
})

app.post("/register", async(req,res)=>{

    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    })

    await user.save()

    res.redirect("/")
})

app.post("/login", async(req,res)=>{

    const user = await User.findOne({
        email:req.body.email,
        password:req.body.password
    })

    if(user){
        res.redirect("/dashboard")
    }
    else{
        res.send("Invalid Credentials")
    }
})

app.listen(3000,()=>{
    console.log("Server running on port 3000")
})