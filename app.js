const express=require("express")
const app=express()
const router = require("./routes")
require('dotenv').config()
const db=require("./db")

/// MIDDLEWARE
app.use(express.json())

app.use("/api",router)
app.use("/",(req,res)=>{
    res.send("Nothing here")
})

db.on("error",(error)=>console.log(error))
db.once("open",()=>console.log("DB Connected"))
app.listen(process.env.SERVER_PORT,()=>console.log(`Escuchando en ${process.env.SERVER_PORT}`))