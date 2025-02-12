const User = require('../models/models.user')
const userDTO = require('../data-transfer-object/dto.user')

exports.create = async (req,res)=>{
  try{
    const user = new User({
      id:`${req.body.username}${Date.now()}`,
      username:req.body.username,
      email:req.body.email,
      age:req.body.age,
      city:req.body.city,
      zipcode:req.body.zipcode
    })
    await user.save().then(user=>{
      res.status(200).json(user)
      console.log("user is : ",user)
  
    })
  }
  catch(err){
    console.log(err) //output the server error on terminal instead of sending as response
    res.status(500).json({err:"An error occured while signup!"})
  }
  
}


exports.getUser = async (req,res) =>{
  try{
    if(req.query.id){
      const userdata = await User.findOne({id:req.query.id, isDeleted:{$in:[null, undefined, false]}})
      
      if(!userdata || !Object.keys(userdata).length){
        res.status(404).json({err:"User does not exist!"})
      }

      else{

        const user = new userDTO(userdata)
        res.status(200).json(user)
      }
    }
    else{
      const userdata =await User.find({isDeleted:{$in:[null, undefined, false]}})
      if(!userdata){
        res.status().json({err:"No User Found!"})
      }
      else{
        res.send(userdata.map(user=>new userDTO(user.toObject())))
      }
    
    }
  }
  catch(err){
    console.log(err)
    res.status(500).json({err:"An error occured while getting user data!"})
  }
 

}

exports.updateUser = async (req,res)=>{
  try{
    const filter = {id:req.query.id,isDeleted:null || undefined}
    const payload = {
      username:req.body.username,
      email:req.body.email,
      age:req.body.age,
      city:req.body.city,
      zipcode:req.body.zipcode
    }
    // console.log("Update :",filter)
    const userdata = await User.findOneAndUpdate(filter,payload,{new:true})
    
    if(!userdata){
      res.status(404).json({err:"User does not exist or invalid id!"})
      return(0)
      
    }
    else{
    res.status(200).json(userdata)
      return(0)
    }
  }
  catch(err){
    console.log("Cathc Block :",err)

    res.status(500).json({err:"An error occurred while updating user data!"})
  }
}



exports.delete = async (req,res)=>{
  //Soft Delete
  try{
    const filter = {id: req.query.id}
    console.log("User ID to Delete",filter)
    const delPayload = {
      isDeleted:true,
      deletedAt:Date.now()
    }

    const deletedUser = await User.findOneAndUpdate(filter, delPayload) 
    res.status(200).json({msg:"User deleted Succesfully", deletedUser:deletedUser})

  }
  catch(err){
    res.status(500).json({err:"An error occurred while deleting user!"})
    console.log(err)
  }
}
/*

name:silvia alexander
email:silvia@alexander.com
age:27
city:George Town Guyana SA
zipcode:600001
*/