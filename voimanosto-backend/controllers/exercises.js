const exerciseRouter = require('express').Router({ mergeParams: true })
const Exercise = require('../models/exercise')
const utils = require('../utils/middleware')
const User = require('../models/user')
const PR = require('../models/personalRecord')

exerciseRouter.get('/', async (req, res, next) => {
  const verified = await utils.verifyIdentity(req)
  if (verified !== true) {
    res.status(401).json({ error: verified })
  } else {
    try {
      const user = await User.findOne({ username: req.params.username })
      console.log(user)
      Exercise.find({ user: user._id })
        .sort({ name: 1, variation: 1 })
        .then(exercises => {
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
      Exercise.find({ user: user._id, type: req.params.type })
        .sort({ name: 1, variation: 1 })
        .then(exercises => {
          res.json(exercises)
        })
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
        type: req.params.type,
        name: req.params.name
      })
        .sort({ name: 1, variation: 1 })
        .then(exercises => {
          res.json(exercises)
        })
    } catch (exception) {
      next(exception)
    }
  }
})

exerciseRouter.post('/', async (req, res, next) => {
  const verified = await utils.verifyIdentity(req)
  if (verified !== true) {
    res.status(401).json({ error: verified })
  } else {
    try {
      const user = await User.findOne({
        username: req.params.username
      })
      const newExercise = new Exercise({
        type: req.body.type,
        name: req.body.name,
        variation: req.body.variation,
        user: user._id,
        prs: []
      })
      const savedExercise = await newExercise.save()
      const newPR = new PR({
        exercise: savedExercise._id,
        user: user._id,
        reps: 1,
        weight: req.body.weight,
        isCurrentPR: true
      })
      const savedPR = await newPR.save()
      savedExercise.prs = savedExercise.prs.concat(savedPR._id)
      const exercise = await savedExercise.save()
      user.exercises = user.exercises.concat(exercise._id)
      await user.save()
      res.json(exercise.toJSON())
    } catch (exception) {
      next(exception)
    }
  }
})

module.exports = exerciseRouter
