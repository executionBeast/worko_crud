const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id:String,
  username: String,
  email:String,
  age:Number,
  city:String,
  zipcode:Number,
  isDeleted:Boolean,
  deletedAt:Number
},{timestamps:true})

const User = mongoose.model("user",userSchema)
module.exports = User;