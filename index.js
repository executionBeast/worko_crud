const express = require("express")
const dotenv = require('dotenv')
const connectDB = require('./database/connection')
const path  = require('path')
//route.js contains all routes defined it is used here in index.js at '/' endpoint
//since I am working on API so I have to later change it to '/api'
const router = require('./routes/route')

const app = express()

dotenv.config({path:'./config.env'})
const PORT = process.env.PORT
const DB_URI = process.env.DB_URI


connectDB(DB_URI)

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req,res)=>{
  res.render('index')
  // res.status(200).json({conn:'Succesfully Connected'})
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')
app.use('/api',router)

module.exports = app; //for vercel to use

if(!process.env.VERCEL) {

  app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
  })
  
}
