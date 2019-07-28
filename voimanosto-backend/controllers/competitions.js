const competitionsRouter = require('express').Router({ mergeParams: true })
const User = require('../models/user')
const Competition = require('../models/competition')
const Exercise = require('../models/exercise')
const Bodyweight = require('../models/bodyweight')
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

      // Update old PRs if competition numbers are higher
      for (ex of sbd) {
        let old = await Exercise.findOne({
          type: 'sbd',
          variation: 'Competition',
          name: ex,
          user: user._id
        }).populate('PersonalRecord')
        let oldPR
        if (old) {
          if (old.prs.length > 0) {
            oldPR = await PR.findById(old.prs[old.prs.length - 1])
          }
        }
        const weight =
          ex === 'Squat'
            ? body.squat
            : ex === 'Bench'
            ? body.bench
            : body.deadlift
        if (oldPR === null || oldPR === undefined) {
          let savedExercise
          if (old === null || old === undefined) {
            old = new Exercise({
              type: 'sbd',
              name: ex,
              variation: 'Competition',
              user: user._id,
              prs: []
            })
            savedExercise = await old.save()
            user.exercises = user.exercises.concat(savedExercise._id)
            await user.save()
          } else savedExercise = old
          let newPR = new PR({
            exercise: savedExercise._id,
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
            previousPR: null
          })
          const savedPR = await newPR.save()
          savedExercise.prs = savedExercise.prs.concat(savedPR._id)
          await savedExercise.save()
        } else if (oldPR.weight <= weight) {
          oldPR.isCurrentPR = false
          await oldPR.save()
          let newPR = new PR({
            exercise: oldPR.exercise,
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
            previousPR: oldPR._id
          })
          const savedPR = await newPR.save()
          const exercise = await Exercise.findById(oldPR.exercise)
          exercise.prs = exercise.prs.concat(savedPR._id)
          await exercise.save()
        } else {
          console.log('old PR was higher for ', ex)
        }
      }
      // Add competition bodyweight to user's bodyweights
      const bw = new Bodyweight({
        date: body.date,
        bodyweight: body.bodyweight,
        user: user._id
      })
      const savedBw = await bw.save()
      user.bodyweight = user.bodyweight.concat(savedBw._id)
      await user.save()
      res.json(savedComp.toJSON())
    } catch (exception) {
      next(exception)
    }
  }
})

module.exports = competitionsRouter
