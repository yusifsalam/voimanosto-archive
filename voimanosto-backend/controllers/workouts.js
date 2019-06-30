const workoutsRouter = require('express').Router()
const Workout = require('../models/workout')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = req => {
  const auth = req.get('authorization')
  if (auth && auth.toLowerCase().startsWith('bearer')) {
    return auth.substring(7)
  }
  return null
}

workoutsRouter.post('/', async (req, res, next) => {
  const body = req.body
  const token = getTokenFrom(req)
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(body.userId)

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
  const workouts = await Workout.find({}).populate('user', {
    username: 1,
    name: 1
  })
  res.json(workouts.map(workout => workout.toJSON()))
})

module.exports = workoutsRouter
