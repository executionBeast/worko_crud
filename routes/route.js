const express =  require('express')
const router = express.Router()
const controller = require('../controller/controller')
const {validateIsDeleted, validatePostData, validatePutData} = require('../middlewares/middleware.js')



//checkFormData middleware checks tha req.body object if true then next() to the controller
/**
 * @swagger
 * /api/user/:
 *   get:
 *     summary: Get user by ID (optional)
 *     tags: ["User Management APIs"]
 *     operationId: Get User
 *     parameters:
 *       - name: id
 *         in: query
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/user/', controller.getUser)

/**
 * @swagger
 * /api/create:
 *   post:
 *     summary: Create a new user
 *     tags: ["User Management APIs"]
 *     description: Creates a new user with a unique ID based on username and timestamp.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - age
 *               - city
 *               - zipcode
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johndoe@example.com
 *               age:
 *                 type: integer
 *                 example: 25
 *               city:
 *                 type: string
 *                 example: New York
 *               zipcode:
 *                 type: string
 *                 example: "10001"
 *     responses:
 *       200:
 *         description: User created successfully
 */
router.post('/create', validatePostData, controller.create)


/**
 * @swagger
 * /api/user:
 *   put:
 *     summary: Update an existing user
 *     tags: ["User Management APIs"]
 *     description: Updates user details based on the provided user ID.
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique user ID to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - age
 *               - city
 *               - zipcode
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe_updated
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johndoe_updated@example.com
 *               age:
 *                 type: integer
 *                 example: 26
 *               city:
 *                 type: string
 *                 example: Los Angeles
 *               zipcode:
 *                 type: string
 *                 example: "90001"
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: johndoe171234567890
 *                 username:
 *                   type: string
 *                   example: johndoe_updated
 *                 email:
 *                   type: string
 *                   example: johndoe_updated@example.com
 *                 age:
 *                   type: integer
 *                   example: 26
 *                 city:
 *                   type: string
 *                   example: Los Angeles
 *                 zipcode:
 *                   type: string
 *                   example: "90001"
 */

router.put('/user/', validatePutData, controller.updateUser)


/**
 * @swagger
 * /api/user/:
 *   delete:
 *     summary: Soft delete a user
 *     tags: ["User Management APIs"]
 *     description: Marks a user as deleted instead of permanently removing them.
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique user ID to delete.
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "User deleted successfully"
 *                 deletedUser:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "johndoe171234567890"
 *                     isDeleted:
 *                       type: boolean
 *                       example: true
 *                     deletedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-02-11T12:34:56Z"
 */

router.delete('/user/', validateIsDeleted, controller.delete)


module.exports = router;