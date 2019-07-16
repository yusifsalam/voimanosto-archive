const prRouter = require('express').Router({ mergeParams: true })
const utils = require('../utils/middleware')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const PR = require('../models/personalRecord')
const Exercise = require('../models/exercise')

prRouter.get('/', async (req, res, next) => {
  const token = utils.getTokenFrom(req)
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findOne({ username: req.params.username })
    if (decodedToken.id !== user._id.toString()) {
      return res.status(401).json({ error: 'unauthorized!' })
    }
    const prs = await PR.find({
      user: user._id
    })
    res.json(prs.map(pr => pr.toJSON()))
  } catch (exception) {
    next(exception)
  }
})

prRouter.get('/:exercise', async (req, res, next) => {
  const verified = await utils.verifyIdentity(req, res, next)
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findOne({ username: req.params.username })
    if (decodedToken.id !== user._id.toString()) {
      return res.status(401).json({ error: 'unauthorized!' })
    }
    const exercise = await Exercise.findOne({ name: req.params.exercise })
    if (!exercise) {
      return res.status(404).json({ error: 'exercise not found' })
    }
    const prs = await PR.find({
      user: user._id,
      exercise: exercise.name
    })
    res.json(prs.map(pr => pr.toJSON()))
  } catch (exception) {
    next(exception)
  }
})

prRouter.get('/:exercise/:variation', async (req, res, next) => {
  const token = utils.getTokenFrom(req)
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findOne({ username: req.params.username })
    if (decodedToken.id !== user._id.toString()) {
      return res.status(401).json({ error: 'unauthorized!' })
    }
    const exercise = await Exercise.findOne({
      name: req.params.exercise,
      variation: req.params.variation
    })
    if (!exercise) {
      return res.status(404).json({ error: 'exercise not found' })
    }
    const prs = await PR.find({
      user: user._id,
      exercise: exercise.name
    })
    res.json(prs.map(pr => pr.toJSON()))
  } catch (exception) {
    next(exception)
  }
})

module.exports = prRouter
