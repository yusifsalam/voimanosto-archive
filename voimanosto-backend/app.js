const config = require('./utils/config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const usersRouter = require('./controllers/users')
const workoutsRouter = require('./controllers/workouts')
const exercsiesRouter = require('./controllers/exercises')
const loginRouter = require('./controllers/login')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const path = require('path')
const cloudinary = require('cloudinary')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname)
  }
})
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 3
  },
  fileFilter: fileFilter
})

mongoose
  .connect(config.MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true })
  .then(res => {
    console.log('connected to MongoDB')
  })
  .catch(err => {
    console.log('could not connect to MongoDB', err.message)
  })

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))
app.use(middleware.requstLogger)

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/workouts', workoutsRouter)
app.use('/api/exercises', exercsiesRouter)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/build/index.html'))
})

app.post('/img_upload', upload.single('file'), (req, res, next) => {
  cloudinary.uploader.upload(req.file.path, function(result, error) {
    console.log('**uploading file**')
    console.log('result', result)
    if (error) {
      next(error)
    }
    res.json(result)
  })
})
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app