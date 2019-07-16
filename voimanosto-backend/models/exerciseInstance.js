const mongoose = require('mongoose')

const exerciseInstanceSchema = mongoose.Schema({
  exercise: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exercise'
  },
  reps: Number,
  sets: Number,
  weight: Number,
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
