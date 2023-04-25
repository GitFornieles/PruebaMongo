const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    pictures:[{type:String,required:true}],
    categories:[{type:String,required:true}],
    price:{type:Number,required:true},
    owner:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
});

module.exports = mongoose.model("Article", ArticleSchema);