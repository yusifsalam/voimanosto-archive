const bodyweightsRouter = require('express').Router({ mergeParams: true })
const utils = require('../utils/middleware')
const User = require('../models/user')
const Bodyweight = require('../models/bodyweight')
const moment = require('moment')

bodyweightsRouter.post('/', async (req, res, next) => {
  const verified = await utils.verifyIdentity(req)
  if (verified !== true) {
    res.status(401).json({ error: verified })
  } else {
    try {
      const user = await User.findOne({ username: req.params.username })
      const newBw = new Bodyweight({
        date: req.body.date,
        user: user._id,
        bodyweight: req.body.bodyweight
      })
      const savedBw = await newBw.save()
      user.bodyweight = user.bodyweight.concat(savedBw._id)
      await user.save()
      res.json(savedBw.toJSON())
    } catch (exception) {
      next(exception)
    }
  }
})

bodyweightsRouter.get('/', async (req, res, next) => {
  const verified = await utils.verifyIdentity(req)
  if (verified !== true) {
    res.status(401).json({ error: verified })
  } else {
    try {
      const user = await User.findOne({ username: req.params.username })
      const bodyweights = await Bodyweight.find({
        user: user._id
      }).sort({ date: 'asc' })

      res.json(bodyweights.map(bw => bw.toJSON()))
    } catch (exception) {
      next(exception)
    }
  }
})

bodyweightsRouter.get('/:date/month', async (req, res, next) => {
  const verified = await utils.verifyIdentity(req)
  if (verified !== true) {
    res.status(401).json({ error: verified })
  } else {
    try {
      const user = await User.findOne({ username: req.params.username })
      const day = req.params.date
      const start = moment(day)
        .startOf('month')
        .subtract(6, 'days')
      const end = moment(day)
        .endOf('month')
        .add(6, 'days')
      const bodyweigts = await Bodyweight.find({
        date: {
          $gte: start,
          $lte: end
        },
        user: user._id
      }).select({ _id: 1, date: 1 })
      if (bodyweigts && bodyweigts.length !== 0) {
        res.json(bodyweigts)
      } else {
        res.json([{ error: 'no bodyweights during period' }])
      }
    } catch (exception) {
      next(exception)
    }
  }
})

bodyweightsRouter.put('/:id', async (req, res, next) => {
  const verified = await utils.verifyIdentity(req)
  if (verified !== true) {
    res.status(401).json({ error: verified })
  } else {
    try {
      const user = await User.findOne({ username: req.params.username })
      const body = req.body
      const bodyweight = {
        bodyweight: body.bodyweight,
        date: body.date,
        user: user._id
      }
      const modifiedBodyweight = await Bodyweight.findByIdAndUpdate(
        req.params.id,
        bodyweight,
        { new: true }
      )
      res.json(modifiedBodyweight.toJSON())
    } catch (exception) {
      next(exception)
    }
  }
})

bodyweightsRouter.delete('/:id', async (req, res, next) => {
  const verified = await utils.verifyIdentity(req)
  if (verified !== true) {
    res.status(401).json({ error: verified })
  } else {
    try {
      await Bodyweight.findByIdAndDelete(req.params.id)
      res.status(204).end()
    } catch (exception) {
      next(exception)
    }
  }
})

module.exports = bodyweightsRouter
