const express = require("express")
const dotenv = require('dotenv')
const connectDB = require('./database/connection')
const path  = require('path')
const cors = require('cors')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
//route.js contains all routes defined it is used here in index.js at '/' endpoint
//since I am working on API so I have to later change it to '/api'
const router = require('./routes/route')
const { description } = require("./validator/userValidator")

const app = express()

dotenv.config({path:'./config.env'})
const PORT = process.env.PORT
const DB_URI = process.env.DB_URI


connectDB(DB_URI)

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'User Management | CRUD APIs',
      description: 'REST APIs for Create Read Update and Delete Operations on User Data',
      version: '1.0.0'
    },
  },

    servers: [{url: `https://worko-crud.vercel.app/`}],
    apis: ['./routes/route.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);


'application/json'
app.use(cors({
  origin:'*',
  methods:['GET','POST','PUT', 'DELETE'],
  allowedHeaders:['Content-type']
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// app.use(express.static(path.join(__dirname, 'public')));

// app.get('/',(req,res)=>{
//   res.render('index')
//   res.status(200).json({conn:'Succesfully Connected'})
// })

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs')
app.use('/api',router)
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


module.exports = app; //for vercel to use

if(!process.env.VERCEL) {

  app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
  })
  
}
