const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    owner:{type:String,required:true},
    content:[{type:mongoose.Schema.Types.ObjectId, ref:"Article"},{type:Number,}],
    purchased:{type:Boolean,default:false}
});

module.exports = mongoose.model("Cart", CartSchema);