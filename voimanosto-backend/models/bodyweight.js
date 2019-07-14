const mongoose = require('mongoose')

const bodyweightSchema = mongoose.Schema({
  bodyweight: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

bodyweightSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = document._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.user
  }
})

const Bodyweight = mongoose.model('Bodyweight', bodyweightSchema)

module.exports = Bodyweight
