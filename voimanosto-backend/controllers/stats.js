const statsRouter = require('express').Router({ mergeParams: true })
const utils = require('../utils/middleware')
const User = require('../models/user')
const Stats = require('../models/stats')

statsRouter.get('/', async (req, res, next) => {
  const verified = await utils.verifyIdentity(req)
  if (verified !== true) {
    res.status(401).json({ error: verified })
  } else {
    try {
      const user = await User.findOne({ username: req.params.username })
      const stats = await Stats.findOne({ user: user._id })
      res.json(stats.toJSON())
    } catch (exception) {
      next(exception)
    }
  }
})

module.exports = statsRouter
