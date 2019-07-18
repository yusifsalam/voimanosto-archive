const mongoose = require('mongoose')

const exerciseSchema = mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  variation: { type: String, required: true },
  prs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PersonalBest'
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

exerciseSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Exercise', exerciseSchema)
