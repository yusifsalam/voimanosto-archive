const exerciseRouter = require('express').Router()
const Exercise = require('../models/exercise')

exerciseRouter.get('/', (req, res) => {
  Exercise.find({}).then(exercises => {
    res.json(exercises)
  })
})

exerciseRouter.post('/', (req, res) => {
  const body = req.body
  if (body.etype === undefined) {
    return res.status(400).json({ error: 'exercise type missing' })
  }

  const exercise = new Exercise({
    etype: body.etype,
    variation: body.variation,
    volume: body.volume,
    important: body.important || false,
    date: new Date()
  })
  exercise.save().then(savedExercise => {
    res.json(savedExercise.toJSON())
  })
})

exerciseRouter.get('/:id', (req, res) => {
  Exercise.findById(req.params.id).then(exercise => {
    res.json(exercise.toJSON())
  })
})

exerciseRouter.delete('/:id', (req, res) => {
  const id = Number(req.params.id)
  exercises = exercises.filter(note => note.id !== id)
  res.status(204).end()
})

module.exports = exerciseRouter
