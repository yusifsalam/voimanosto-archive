const notificationsRouter = require('express').Router({ mergeParams: true })
const utils = require('../utils/middleware')
const User = require('../models/user')
const Notification = require('../models/notification')

notificationsRouter.get('/', async (req, res, next) => {
  const verified = await utils.verifyIdentity(req)
  if (verified !== true) {
    res.status(401).json({ error: verified })
  } else {
    try {
      const user = await User.findOne({ username: req.params.username })
      const notifications = await Notification.find({
        user: user._id,
        seen: false
      })
      res.json(notifications.map(n => n.toJSON()))
    } catch (exception) {
      next(exception)
    }
  }
})

notificationsRouter.get('/all', async (req, res, next) => {
  const verified = await utils.verifyIdentity(req)
  if (verified !== true) {
    res.status(401).json({ error: verified })
  } else {
    try {
      const user = await User.findOne({ username: req.params.username })
      const notifications = await Notification.find({
        user: user._id
      })
      res.json(notifications.map(n => n.toJSON()))
    } catch (exception) {
      next(exception)
    }
  }
})

notificationsRouter.post('/', async (req, res, next) => {
  const verified = await utils.verifyIdentity(req)
  if (verified !== true) {
    res.status(401).json({ error: verified })
  } else {
    try {
      const user = await User.findOne({ username: req.params.username })
      const notification = new Notification({
        user: user._id,
        date: req.body.date,
        message: req.body.message,
        type: req.body.type
      })

      const savedNotification = await notification.save()
      user.notifications = user.notifications.concat(savedNotification._id)
      await user.save()
      res.json(savedNotification.toJSON())
    } catch (exception) {
      next(exception)
    }
  }
})

notificationsRouter.put('/:id', async (req, res, next) => {
  const verified = await utils.verifyIdentity(req)
  if (verified !== true) {
    res.status(401).json({ error: verified })
  } else {
    try {
      const body = req.body
      const notification = {
        user: body.user,
        date: body.date,
        message: body.message,
        seen: body.seen,
        type: body.type
      }

      const modifiedNotification = await Notification.findByIdAndUpdate(
        req.params.id,
        notification,
        { new: true }
      )
      res.json(modifiedNotification.toJSON())
    } catch (exception) {
      next(exception)
    }
  }
})
