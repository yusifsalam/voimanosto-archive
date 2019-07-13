const workoutsRouter = require('express').Router({ mergeParams: true })
const Workout = require('../models/workout')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const getTokenFrom = require('../utils/middleware')

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
  const user = await User.findOne({ username: req.params.username })
  const workouts = await Workout.find({
    user: user._id
  }).populate('user', {
    username: 1,
    name: 1
  })
  res.json(workouts.map(workout => workout.toJSON()))
})

workoutsRouter.get('/:date', async (req, res, next) => {
  try {
    const workout = await Workout.findOne({ date: req.params.date })
    res.json(workout.toJSON())
  } catch (exception) {
    next(exception)
  }
})

module.exports = workoutsRouter
