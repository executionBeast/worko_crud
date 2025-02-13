const express = require("express")
const dotenv = require('dotenv')
const connectDB = require('./database/connection')
const cors = require('cors')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
//route.js contains all routes defined it is used here in index.js at '/' endpoint
//since I am working on API so I have to later change it to '/api'
const router = require('./routes/route')

const app = express()

dotenv.config({path:'./config.env'})
const PORT = process.env.PORT
const DB_URI = process.env.DB_URI
const SWAGGER_SERVER_URL = process.env.SWAGGER_SERVER_URL
const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

console.log("SWAGGER_SERVER_URL ==>",SWAGGER_SERVER_URL)


connectDB(DB_URI)

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User Management | CRUD APIs',
      description: 'REST APIs for Create Read Update and Delete Operations on User Data',
      version: '1.0.0'
    },
  },

    servers: [{url: "https://worko-crud.vercel.app/"}],
    apis: ["./routes/*.js"]
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

const options = {
  customCss: '.swagger-ui .topbar { display: none }'
}


app.use('/api',router)

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs,{
  customCss: ".opblock-summary-path-description-wrapper { display:contents; padding-left:4px; gap:8px; justify-content:center; align-items:center }",
  customCssUrl: "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css", // Load from a CDN
}))


module.exports = app; //for vercel to use

if(!process.env.VERCEL) {

  app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
  })
  
}
