const mongoose = require('mongoose')

const exerciseSchema = mongoose.Schema({
  etype: String,
  name: String,
  variation: String,
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
