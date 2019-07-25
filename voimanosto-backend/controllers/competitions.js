const competitionsRouter = require('express').Router({ mergeParams: true })
const User = require('../models/user')
const Competition = require('../models/competition')
const Exercise = require('../models/exercise')
const PR = require('../models/personalRecord')
const utils = require('../utils/middleware')

competitionsRouter.get('/:type', async (req, res, next) => {
  const verified = await utils.verifyIdentity(req)
  if (verified !== true) {
    res.status(401).json({ error: verified })
  } else {
    try {
      const user = await User.findOne({ username: req.params.username })
      const comps = await Competition.find({
        user: user._id,
        type: req.params.type
      }).sort({ date: 1 })
      res.json(comps.map(comp => comp.toJSON()))
    } catch (exception) {
      next(exception)
    }
  }
})

competitionsRouter.post('/', async (req, res, next) => {
  const verified = await utils.verifyIdentity(req)
  if (verified !== true) {
    res.status(401).json({ error: verified })
  } else {
    try {
      const body = req.body
      const user = await User.findOne({ username: req.params.username })
      const newComp = new Competition({
        user: user._id,
        date: body.date,
        type: body.type,
        name: body.name,
        venue: body.venue,
        result: {
          squat: body.squat,
          bench: body.bench,
          deadlift: body.deadlift,
          ipf: body.ipf,
          wilks: body.wilks
        },
        bodyweight: body.bodyweight
      })
      const savedComp = await newComp.save()
      user.competitions = user.competitions.concat(savedComp._id)
      await user.save()
      const sbd = ['Squat', 'Bench', 'Deadlift']
      for (ex of sbd) {
        let old = await Exercise.findOne({
          type: 'sbd',
          variation: 'Competition',
          name: ex,
          user: user._id
        }).populate('PersonalRecord')
        const oldPR = await PR.findById(old.prs[old.prs.length - 1])
        const weight =
          ex === 'Squat'
            ? body.squat
            : ex === 'Bench'
            ? body.bench
            : body.deadlift
        if (!oldPR) {
          let newPR = new PR({
            exercise: old._id,
            user: user._id,
            reps: 1,
            weight:
              ex === 'Squat'
                ? body.squat
                : ex === 'Bench'
                ? body.bench
                : body.deadlift,
            date: body.date,
            isCurrentPR: true,
            previousPR: oldPR ? oldPR._id : null
          })
          if (oldPR) {
            oldPR.isCurrentPR = false
            await oldPR.save()
          }
          const savedPR = await newPR.save()
          old.prs = old.prs.concat(savedPR._id)
          await old.save()
        } else if (oldPR.weight > weight) {
          console.log('OLD', ex, ' PR is greater')
        }
      }

      res.json(savedComp.toJSON())
    } catch (exception) {
      next(exception)
    }
  }
})

module.exports = competitionsRouter
