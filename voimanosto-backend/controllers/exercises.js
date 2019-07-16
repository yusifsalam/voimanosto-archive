const exerciseRouter = require('express').Router({ mergeParams: true })
const Exercise = require('../models/exercise')
const utils = require('../utils/middleware')
const User = require('../models/user')

exerciseRouter.get('/', async (req, res, next) => {
  const verified = await utils.verifyIdentity(req)
  if (verified !== true) {
    res.status(401).json({ error: verified })
  } else {
    try {
      const user = await User.findOne({ username: req.params.username })
      console.log(user)
      Exercise.find({ user: user._id }).then(exercises => {
        res.json(exercises)
      })
    } catch (exception) {
      next(exception)
    }
  }
})

exerciseRouter.get('/:type', async (req, res, next) => {
  const verified = await utils.verifyIdentity(req)
  if (verified !== true) {
    res.status(401).json({ error: verified })
  } else {
    try {
      const user = await User.findOne({
        username: req.params.username
      })
      Exercise.find({ user: user._id, etype: req.params.type }).then(
        exercises => {
          res.json(exercises)
        }
      )
    } catch (exception) {
      next(exception)
    }
  }
})

exerciseRouter.get('/:type/:name', async (req, res, next) => {
  const verified = await utils.verifyIdentity(req)
  if (verified !== true) {
    res.status(401).json({ error: verified })
  } else {
    try {
      const user = await User.findOne({
        username: req.params.username
      })
      Exercise.find({
        user: user._id,
        etype: req.params.type,
        name: req.params.name
      }).then(exercises => {
        res.json(exercises)
      })
    } catch (exception) {
      next(exception)
    }
  }
})

exerciseRouter.post('/', (req, res) => {
  const body = req.body
  if (body.etype === undefined) {
    return res.status(400).json({ error: 'exercise type missing' })
  }

  const exercise = new Exercise({
    etype: body.etype,
    variation: body.variation,
    name: body.name
  })
  exercise.save().then(savedExercise => {
    res.json(savedExercise.toJSON())
  })
})

module.exports = exerciseRouter
