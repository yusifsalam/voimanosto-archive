const mongoose = require('mongoose')

const exerciseInstanceSchema = mongoose.Schema({
  exercise: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exercise'
  },
  workout: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workout'
  },
  reps: {
    type: Number,
    required: true
  },
  sets: {
    type: Number,
    required: true
  },
  weight: { type: Number, required: true },
  intensity: {
    type: Number,
    min: 0,
    max: 100
  },
  RPE: {
    type: Number,
    min: 5,
    max: 10
  },
  isPR: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

exerciseInstanceSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('ExerciseInstance', exerciseInstanceSchema)
