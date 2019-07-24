const mongoose = require('mongoose')

const competitionSchema = mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  type: {
    type: String,
    required: True
  },
  name: {
    type: String,
    required: True
  },
  venue: String,
  result: {
    squat: Number,
    bench: Number,
    deadlfit: Number,
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

module.exports = mongoose.model('Competition', competitionSchema)
