const express =  require('express')
const router = express.Router()
const controller = require('../controller/controller')
const {validateIsDeleted, validatePostData, validatePutData} = require('../middlewares/middleware.js')



//checkFormData middleware checks tha req.body object if true then next() to the controller
router.post('/create', validatePostData, controller.create)
router.get('/user/', controller.getUser)
router.put('/user/', validatePutData, controller.updateUser)
router.delete('/user/', validateIsDeleted, controller.delete)


module.exports = router;