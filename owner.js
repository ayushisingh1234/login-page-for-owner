const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
  name: { type: String,required:true },
  email: { type: String, unique: true,required:true },
});

exports.ownerSchema=ownerSchema;
exports.ownerModel = mongoose.model("owner", ownerSchema);