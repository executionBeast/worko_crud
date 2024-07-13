const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id:String,
  name: String,
  email:String,
  age:Number,
  city:String,
  zipcode:Number,
  isDeleted:Boolean,
  deletedAt:Number
})

const User = mongoose.model("user",userSchema)
module.exports = User;