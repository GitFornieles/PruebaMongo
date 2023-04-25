const express=require("express")
const router = express.Router()
const userRouter=require("./users")
const articleRouter=require("./articles")
const cartRouter=require("./carts")


router.get("/",(req,res)=>{
    res.send("ok")
})
router.use("/users",userRouter)
router.use("/articles",articleRouter)
router.use("/carts",cartRouter)

module.exports=router