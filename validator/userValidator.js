const joi= require('joi')

const userSchemaJOI = joi.object({
  username: joi.string()
           .min(1)
           .max(50)
           .required(),
  
  email: joi.string()
            .email()
            .required(),

  age: joi.number()
          .min(1)
          .max(299)
          .required(),
  city: joi.string()
          .min(3)
          .max(300)
          .required(),

  zipcode: joi.number()
              .min(10000)
              .required()
          
}
)
// let dta = {name:'ruahul',email:'rahul@rahula.com',age:15,city:'Bijnor',zipcode:297467}
// let {error,value} = userSchemaJOI.validate(dta)
// console.log("Validation Error: ",error, "\n Validated Value : ",value)

module.exports = userSchemaJOI;