const mongoose = require('mongoose')

const personalRecordSchema = mongoose.Schema({
  exercise: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exercise',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reps: { type: Number, required: true },
  weight: { type: Number, required: true },
  date: Date,
  isCurrentPR: Boolean,
  previousPR: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PersonalRecord'
  },
  youtubeURL: String
})

personalRecordSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('PersonalRecord', personalRecordSchema)
