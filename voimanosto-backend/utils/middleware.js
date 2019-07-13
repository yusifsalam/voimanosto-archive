const logger = require('./logger')

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

module.exports = {
  requstLogger,
  unknownEndpoint,
  errorHandler,
  getTokenFrom: function(req) {
    const auth = req.get('authorization')
    if (auth && auth.toLowerCase().startsWith('bearer')) {
      return auth.substring(7)
    }
    return null
  }
}
