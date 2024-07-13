const joi = require("joi")
const validateUserPutData = joi.object({
  name: joi.string()
           .alphanum()
           .min(1)
           .max(50),
  
  email: joi.string()
            .email(),

  age: joi.number()
          .min(1)
          .max(299),

  city: joi.string()
           .pattern(new RegExp(`^[a-zA-Z ]{3,100}$`)),

  zipcode: joi.number()
              .min(10000),
          
})

module.exports = validateUserPutData;