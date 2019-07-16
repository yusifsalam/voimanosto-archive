const bodyweightsRouter = require('express').Router({ mergeParams: true })
const utils = require('../utils/middleware')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Bodyweight = require('../models/bodyweight')

bodyweightsRouter.post('/', async (req, res, next) => {
  const verified = await utils.verifyIdentity(req)
  if (verified !== true) {
    res.status(401).json({ error: verified })
  } else {
    try {
      const user = await User.findOne({ username: req.params.username })
      const newBw = new Bodyweight({
        date: req.body.date,
        user: user._id,
        bodyweight: req.body.bodyweight
      })
      const savedBw = await newBw.save()
      user.bodyweight = user.bodyweight.concat(savedBw._id)
      await user.save()
      res.json(savedBw.toJSON())
    } catch (exception) {
      next(exception)
    }
  }
})

bodyweightsRouter.get('/', async (req, res, next) => {
  const verified = await utils.verifyIdentity(req)
  if (verified !== true) {
    res.status(401).json({ error: verified })
  } else {
    try {
      const user = await User.findOne({ username: req.params.username })
      const bodyweights = await Bodyweight.find({
        user: user._id
      }).sort({ date: 'asc' })

      res.json(bodyweights.map(bw => bw.toJSON()))
    } catch (exception) {
      next(exception)
    }
  }
})

module.exports = bodyweightsRouter
