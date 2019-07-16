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
    avatar: String,
    workouts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workout'
      }
    ],
    bodyweight: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bodyweight'
      }
    ],
    prs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PersonalRecord'
      }
    ],
    exercises: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exercise'
      }
    ],
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
)

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject.isAdmin
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)
module.exports = User
