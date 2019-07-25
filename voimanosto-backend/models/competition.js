const mongoose = require('mongoose')

const competitionSchema = mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  venue: String,
  result: {
    squat: Number,
    bench: Number,
    deadlift: Number,
    ipf: Number,
    wilks: Number
  },
  bodyweight: {
    type: Number,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

competitionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Competition', competitionSchema)
