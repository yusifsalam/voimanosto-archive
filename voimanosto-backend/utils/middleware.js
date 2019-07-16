const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requstLogger = (req, res, next) => {
  logger.info('Method:', req.method)
  logger.info('Path:', req.path)
  logger.info('Body:', req.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (err, req, res, next) => {
  logger.error(err.message)
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  } else if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'invalid token' })
  }
  next(err)
}

const getTokenFrom = req => {
  const auth = req.get('authorization')
  if (auth && auth.toLowerCase().startsWith('bearer')) {
    return auth.substring(7)
  }
  return null
}

const verifyIdentity = async req => {
  const token = getTokenFrom(req)
  try {
    let decodedToken
    if (token) {
      decodedToken = jwt.verify(token, process.env.SECRET)
    }
    if (!token || !decodedToken.id) {
      return 'token missing or invalid'
    }
    const user = await User.findOne({ username: req.params.username })
    if (!user) {
      return 'user not found'
    }
    if (decodedToken.id !== user._id.toString()) {
      return 'unauthorized'
    } else {
      return true
    }
  } catch (exception) {
    console.error(exception)
    return exception.message
  }
}

module.exports = {
  requstLogger,
  unknownEndpoint,
  errorHandler,
  getTokenFrom,
  verifyIdentity
}
