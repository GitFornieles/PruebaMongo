const express=require("express")
const router = express.Router()
const articleController=require("../controllers/article/index")


router.get("/",(req,res)=>{
    res.send("ok")
})

router.post("/new",async (req,res)=>{
    const newArticle=await articleController.createArticle(req.body)
    res.status(200).send(newArticle)
})

router.post("/getInfo",async (req,res)=>{
    const article=await articleController.getInfo(req.body.articleId)
    res.status(200).send(article)
})

module.exports=router