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

logger.info('connecting to mongodb')

mongoose
  .connect(config.MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true })
  .then(res => {
    console.log('connected to MongoDB')
  })
  .catch(err => {
    console.log('could not connect to MongoDB', err.message)
  })

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))
app.use(middleware.requstLogger)

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/workouts', workoutsRouter)
app.use('/api/exercises', exercsiesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
