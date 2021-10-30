const express = require('express')

const app = express()
const apiRouter = require('./routes/index')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const logger = require('morgan')
const path = require('path')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')
app.get('/',(req,res)=>res.send("hello server"))
require('dotenv').config()
require('./domain/mongo')

app.use(cors({ credentials: true, origin: true }))
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use('/api', apiRouter)

app.listen(process.env.PORT, () =>
  console.log(`${new Date()} || service started on PORT:${process.env.PORT}`)
)
