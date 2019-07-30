const workoutsRouter = require('express').Router({ mergeParams: true })
const Workout = require('../models/workout')
const User = require('../models/user')
const utils = require('../utils/middleware')

workoutsRouter.post('/', async (req, res, next) => {
  const body = req.body
  const token = getTokenFrom(req)
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findOne({ username: req.params.username })

    const workout = new Workout({
      date: body.date,
      user: user._id,
      exercises: []
    })
    const savedWorkout = await workout.save()
    user.workouts = user.workouts.concat(savedWorkout._id)
    await user.save()
    res.json(savedWorkout.toJSON())
  } catch (exception) {
    next(exception)
  }
})

workoutsRouter.get('/', async (req, res) => {
  const verified = await utils.verifyIdentity(req)
  if (verified !== true) {
    res.status(401).json({ error: verified })
  } else {
    try {
      const user = await User.findOne({ username: req.params.username })
      const workouts = await Workout.find({ user: user._id })
      res.json(workouts.map(workout => workout.toJSON()))
    } catch (exception) {
      next(exception)
    }
  }
})

workoutsRouter.get('/:date', async (req, res, next) => {
  const verified = await utils.verifyIdentity(req)
  if (verified !== true) {
    res.status(401).json({ error: verified })
  } else {
    try {
      const user = await User.findOne({ username: req.params.username })
      const workout = await Workout.findOne({
        date: req.params.date,
        user: user._id
      })
      res.json(workout.toJSON())
    } catch (exception) {
      next(exception)
    }
  }
})

module.exports = workoutsRouter
