const mongoose = require("mongoose")


const connectDB = async (DB_URI)=>{
  try{
    await mongoose.connect(DB_URI).then(msg=>{
      console.log({"HOST":msg.connections[0].host, "PORT":msg.connections[0].port})
    })
  }
  catch(err){
    console.log(err)
  }
}

module.exports = connectDB;