const prRouter = require('express').Router({ mergeParams: true })
const utils = require('../utils/middleware')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const PR = require('../models/personalRecord')
const Exercise = require('../models/exercise')

prRouter.get('/', async (req, res, next) => {
  const verified = await utils.verifyIdentity(req)
  if (verified !== true) {
    res.status(401).json({ error: verified })
  } else {
    try {
      const user = await User.findOne({ username: req.params.username })

      const prs = await PR.aggregate([
        { $match: { user: user._id } },
        {
          $lookup: {
            from: 'exercises',
            localField: 'exercise',
            foreignField: '_id',
            as: 'exercise'
          }
        },
        { $unwind: '$exercise' },
        {
          $sort: {
            'exercise.type': 1,
            'exercise.name': 1,
            'exercise.variation': 1
          }
        },
        {
          $project: {
            reps: 1,
            weight: 1,
            'exercise.type': 1,
            'exercise.name': 1,
            'exercise.variation': 1
          }
        }
      ])
      res.json(prs)
    } catch (exception) {
      next(exception)
    }
  }
})

prRouter.get('/:type', async (req, res, next) => {
  const verified = await utils.verifyIdentity(req)
  if (verified !== true) {
    res.status(401).json({ error: verified })
  } else {
    try {
      const user = await User.findOne({ username: req.params.username })

      const prs = await PR.aggregate([
        { $match: { user: user._id } },
        {
          $lookup: {
            from: 'exercises',
            localField: 'exercise',
            foreignField: '_id',
            as: 'exercise'
          }
        },
        { $unwind: '$exercise' },
        { $match: { 'exercise.type': req.params.type } },
        {
          $sort: {
            'exercise.type': 1,
            'exercise.name': 1,
            'exercise.variation': 1,
            reps: 1
          }
        },
        {
          $project: {
            reps: 1,
            weight: 1,
            'exercise.type': 1,
            'exercise.name': 1,
            'exercise.variation': 1
          }
        }
      ])
      res.json(prs)
    } catch (exception) {
      next(exception)
    }
  }
})

prRouter.get('/:type/:name', async (req, res, next) => {
  const verified = await utils.verifyIdentity(req)
  if (verified !== true) {
    res.status(401).json({ error: verified })
  } else {
    try {
      const user = await User.findOne({ username: req.params.username })

      const prs = await PR.aggregate([
        { $match: { user: user._id } },
        {
          $lookup: {
            from: 'exercises',
            localField: 'exercise',
            foreignField: '_id',
            as: 'exercise'
          }
        },
        { $unwind: '$exercise' },
        {
          $match: {
            'exercise.type': req.params.type,
            'exercise.name': req.params.name
          }
        },
        {
          $sort: {
            'exercise.type': 1,
            'exercise.name': 1,
            'exercise.variation': 1
          }
        },
        {
          $project: {
            reps: 1,
            weight: 1,
            'exercise.type': 1,
            'exercise.name': 1,
            'exercise.variation': 1
          }
        }
      ])
      res.json(prs)
    } catch (exception) {
      next(exception)
    }
  }
})

module.exports = prRouter
