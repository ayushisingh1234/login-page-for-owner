const mongoose = require("mongoose");

const ownerModel=require('./Owner').ownerModel;

const productSchema = new mongoose.Schema({
    name: { type: String,required:true },
    cost: { type: Number,required:true },
    category: { type: String, required:true },
    owner:{type: mongoose.ObjectId, ref: ownerModel, required:true}
});


exports.productSchema=productSchema;
exports.productModel = mongoose.model("product", productSchema); 