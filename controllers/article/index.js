const User = require("../../db/models/User");
const Cart = require("../../db/models/Cart");
const Article = require("../../db/models/Article");

//info={article, user}
const createArticle = async (info) => {
  let { article, user } = info;
  article = { ...article, owner: user._id };
  try {
    let newArticle = await Article.create(article);
    let userOwner = await User.findById(user._id);
    userOwner.addSelling(newArticle._id);
    await userOwner.save()
    return {article:newArticle,user:userOwner};
  } catch (error) {
    return error;
  }
};

const getInfo=async(articleId)=>{
    try {
        let article = await Article.findById(articleId).populate("owner")
        return article
    } catch (error) {
        return error
    }
}

module.exports = { createArticle,getInfo };
