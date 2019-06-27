require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const Exercise = require('./models/exercise')
const url = process.env.MONGODB_URI

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))

const squat = new Exercise({
  etype: 'S',
  variation: 'comp',
  volume: 2400,
  date: new Date(),
  important: true
})
// squat.save().then(res => {
//   console.log('exercise saved')
// })
app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/exercises', (req, res) => {
  Exercise.find({}).then(exercises => {
    res.json(exercises)
  })
})

app.post('/api/exercises', (req, res) => {
  const body = req.body
  if (body.etype === undefined) {
    return res.status(400).json({ error: 'content missing' })
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

app.get('/api/exercises/:id', (req, res) => {
  Exercise.findById(req.params.id).then(exercise => {
    res.json(exercise.toJSON())
  })
})

app.delete('/api/exercises/:id', (req, res) => {
  const id = Number(req.params.id)
  exercises = exercises.filter(note => note.id !== id)
  res.status(204).end()
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Serven running on port ${PORT}`)
})
