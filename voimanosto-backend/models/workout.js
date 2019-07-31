const mongoose = require('mongoose')

const workoutSchema = mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  exercises: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ExerciseInstance'
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  notes: String,
  readiness: {
    type: Number,
    min: 1,
    max: 5
  }
})

workoutSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = document._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Workout = mongoose.model('Workout', workoutSchema)

module.exports = Workout
