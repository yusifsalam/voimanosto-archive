const profilePictureRouter = require('express').Router({ mergeParams: true })
const multer = require('multer')
const utils = require('../utils/middleware')
const cloudinary = require('cloudinary')
const User = require('../models/user')

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname)
  }
})
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 3
  },
  fileFilter: fileFilter
})
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

profilePictureRouter.post(
  '/',
  upload.single('file'),
  async (req, res, next) => {
    const verified = await utils.verifyIdentity(req)
    if (verified !== true) {
      res.status(401).json({ error: verified })
    } else {
      try {
        const tempUser = await User.findOne({ username: req.params.username })
        cloudinary.uploader.upload(req.file.path, function(result, error) {
          console.log('**uploading file**')
          console.log('result', result)
          if (error) {
            next(error)
          }
          tempUser.avatar = result.secure_url
          console.log(tempUser)
          tempUser.save()
          res.json({
            username: tempUser.username,
            name: tempUser.name,
            email: tempUser.email,
            avatar: tempUser.avatar,
            token: req.body.token
          })
        })
      } catch (exception) {
        next(exception)
      }
    }
  }
)

module.exports = profilePictureRouter
