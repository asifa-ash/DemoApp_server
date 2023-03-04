import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import cors from "cors"

import auth from "./Routes/Auth_route.js"



const app=express()
app.use(cors())
app.use(bodyParser.json({limit:"10mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"10mb",extended:true}))
mongoose.connect("mongodb://127.0.0.1:27017/demo10",{useNewUrlParser:true,useUnifiedTopology:true}).
then(()=>app.listen(5000,()=>console.log("server connected"))
).catch((error)=>{
console.log(error);
})

 app.use("/auth",auth)
