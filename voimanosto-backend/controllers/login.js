const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (req, res) => {
  const body = req.body
  const user = await User.findOne({ username: body.username })
  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.usernmame,
    id: user._id
  }
  const token = jwt.sign(userForToken, process.env.SECRET)

  res.status(200).send({
    token,
    username: user.username,
    name: user.name,
    email: user.email,
    avatar: user.avatar
  })
})

loginRouter.post('/verify', async (req, res) => {
  const token = req.body.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  return res.json({
    username: user.username,
    name: user.name,
    email: user.email,
    avatar: user.avatar
  })
})

module.exports = loginRouter
