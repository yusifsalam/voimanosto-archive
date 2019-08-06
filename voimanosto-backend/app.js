const config = require('./utils/config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const path = require('path')

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(res => {
    console.log('connected to MongoDB')
  })
  .catch(err => {
    console.log('could not connect to MongoDB', err.message)
  })

app.use(cors())
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'build')))
app.use(middleware.requstLogger)

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/build/index.html'))
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
