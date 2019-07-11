const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      minlength: 3
    },
    name: {
      type: String,
      required: true,
      minlength: 3
    },
    email: {
      type: String,
      unique: true
    },
    passwordHash: String,
    workouts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workout'
      }
    ]
  },
  { timestamps: true }
)

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)
module.exports = User
