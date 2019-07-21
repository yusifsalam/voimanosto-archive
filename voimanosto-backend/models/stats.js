const mongoose = require('mongoose')

const statsSchema = mongoose.Schema({
  volume: {
    squat: Number,
    bench: Number,
    deadlift: Number,
    total: Number
  },
  reps: {
    squat: Number,
    bench: Number,
    deadlift: Number,
    total: Number
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

statsSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Stats', statsSchema)

const statsSchema = mongoose.Schema({
  fruits: [
    {
      apples: Number,
      oranges: Number,
      bananas: Number,
      total: Number
    }
  ]
})
