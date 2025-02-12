const axios = require('axios')
const validateUser = require("../validator/userValidator")
const validateUserPutData = require("../validator/validateVars")



exports.validatePostData = (req,res,next) =>{
  
  const data = req.body;
  let {error} = validateUser.validate(data)
  // console.log("Validation Error: ",error, "\n Validated Value : ",value)
  
  if(error){
    res.status(400).json(error.details.map((value)=>{return {err:value.message}}))
  }

  else{
    next()
  }

}


exports.validatePutData = (req,res,next)=>{

  const {username,email,age,city,zipcode} = req.body
  let data = req.body
  let {error} = validateUserPutData.validate(data)
  console.log(error)
  if(error){
    res.status(400).json(error.details.map(value=>{return {err:value.message}}))
  }

  // if(!req.query || Object.keys(req.body).length ==0){
  //   res.status(400).json({err:"Fill required data!"})
  // }
  // if(!isString([name,email,city]) || !isNumber([age,zipcode])){
  //   res.status(400).json({Error:'Invalid data!'})
    
  // }
  else{
    next()
  }
  
}

exports.validateIsDeleted = async (req,res,next) =>{
  try{
    const id = req.query.id;
    console.log("ID recieved for deletion", id)
    const response = await axios.get(`http://localhost:8000/api/user?id=${id}`)
    console.log("Deletion user Fetched", response.data)
    if(response.data.isDeleted || !response){
      res.status(404).json({err:'User does not exist!tfdiutdiutduitdiutd'})
      return(0)
    }
    else{
      next()
    
  }
}
  catch(err){
    res.status(404).json({err:"User does not exist!"})
  }
}

    // res.status(400).json(error.details.map((value)=>{return {err:value.message}}))


// function isString(arr){
//   let pass = true
//   for(let el of arr){

//     if(!isNaN(el)){
//       pass = false
//     }
//   }
//   console.log("All are string", pass)
//   return(pass)
// }

// function isNumber(arr){
//   let pass = true
//   for(let el of arr){
//     if(isNaN(el)){
//       console.log("Value of isNaN(el) : ",isNaN(el))
//       pass = false
//     }
//   }
//   console.log("All are number", pass)
//   return(pass)
// }