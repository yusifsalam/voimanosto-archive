const workoutsRouter = require('express').Router({ mergeParams: true })
const Workout = require('../models/workout')
const User = require('../models/user')
const utils = require('../utils/middleware')
const Exercise = require('../models/exercise')
const PR = require('../models/personalRecord')
const ExerciseInstance = require('../models/exerciseInstance')
const moment = require('moment')

workoutsRouter.post('/', async (req, res, next) => {
  const verified = await utils.verifyIdentity(req)
  if (verified !== true) {
    res.status(401).json({ error: verified })
  } else {
    try {
      const body = req.body
      const sameDayWorkout = await Workout.findOne({ date: body.date })
      if (sameDayWorkout) {
        return res.json({ error: 'You already have a workout on this day' })
      }
      const user = await User.findOne({ username: req.params.username })
      // create a new workout object and link it to user
      const workout = new Workout({
        date: body.date,
        user: user._id,
        notes: body.notes,
        readiness: body.readiness,
        exercises: []
      })
      const savedWorkout = await workout.save()
      user.workouts = user.workouts.concat(savedWorkout._id)
      await user.save()
      // for each exercise create a new exercise instance
      const exercises = body.exercises
      for (ex of exercises) {
        // find the actual exercise from library
        const exercise = await Exercise.findOne({
          type: ex.type,
          name: ex.name,
          variation: ex.variation
        })
        console.log(ex.name, ex)
        // loop through all sets
        for ([i, rep] of ex.reps.entries()) {
          // find previous PR
          let isThisSetAPR = false
          const oldPR = await PR.findOne({
            exercise: exercise._id,
            isCurrentPR: true,
            reps: rep
          })
          // check if previous PR exists
          if (oldPR) {
            // found previous PR
            console.log(
              `old PR with ${rep} reps for ${ex.name + ' ' + ex.variation}`,
              oldPR
            )
            // check if this set is heavier than PR
            if (ex.weight[i] > oldPR.weight) {
              // add new PR and modify old one
              console.log('this should be new PR')
              oldPR.isCurrentPR = false
              await oldPR.save()
              const newPR = new PR({
                exercise: exercise._id,
                user: user._id,
                reps: ex.reps[i],
                date: body.date,
                isCurrentPR: true,
                previousPR: oldPR._id,
                weight: ex.weight[i]
              })
              const savedNewPR = await newPR.save()
              exercise.prs = exercise.prs.concat(savedNewPR._id)
              await exercise.save()
              isThisSetAPR = true
            } else {
              // do nothing
              console.log('does not exceed previous PR of', oldPR.weight)
            }
          } else {
            // no previous PR, so create a new one
            console.log(
              `${ex.name + ' ' + ex.variation} does not have a previous PR`
            )
            const newPR = new PR({
              exercise: exercise._id,
              user: user._id,
              reps: ex.reps[i],
              date: body.date,
              isCurrentPR: true,
              previousPR: null,
              weight: ex.weight[i]
            })
            console.log('new PR', newPR)
            const savedNewPR = await newPR.save()
            exercise.prs = exercise.prs.concat(savedNewPR._id)
            await exercise.save()
            isThisSetAPR = true
          }

          // create new exercise instance
          const newExerciseInstance = new ExerciseInstance({
            user: user._id,
            exercise: exercise._id,
            workout: savedWorkout._id,
            reps: ex.reps[i],
            sets: ex.sets[i],
            weight: ex.weight[i] === 0 ? null : ex.weight[i],
            intensity: ex.intensity[i] === 0 ? null : ex.intensity[i],
            RPE: ex.RPE[i] === 0 ? null : ex.RPE[i],
            isPR: isThisSetAPR
          })
          console.log(
            `saving exercise instance for ${ex.name + ' ' + ex.variation}`
          )
          const savedExerciseInstance = await newExerciseInstance.save()
          savedWorkout.exercises = workout.exercises.concat(
            savedExerciseInstance._id
          )
        }
        console.log('saving workout')
        await savedWorkout.save()
      }
      console.log(savedWorkout)
      res.json(savedWorkout.toJSON())
    } catch (exception) {
      next(exception)
    }
  }
})

workoutsRouter.get('/', async (req, res) => {
  const verified = await utils.verifyIdentity(req)
  if (verified !== true) {
    res.status(401).json({ error: verified })
  } else {
    try {
      const user = await User.findOne({ username: req.params.username })
      const workouts = await Workout.find({ user: user._id })
      res.json(workouts.map(workout => workout.toJSON()))
    } catch (exception) {
      next(exception)
    }
  }
})

workoutsRouter.get('/:date', async (req, res, next) => {
  const verified = await utils.verifyIdentity(req)
  if (verified !== true) {
    res.status(401).json({ error: verified })
  } else {
    try {
      const user = await User.findOne({ username: req.params.username })
      const workout = await Workout.findOne({
        date: req.params.date,
        user: user._id
      }).populate({ path: 'exercises', populate: 'exercise' })
      if (workout) {
        res.json(workout.toJSON())
      } else {
        res.json([{ exercises: null }])
      }
    } catch (exception) {
      next(exception)
    }
  }
})

workoutsRouter.get('/:date/month', async (req, res, next) => {
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
      const workouts = await Workout.find({
        date: {
          $gte: start,
          $lte: end
        },
        user: user._id
      }).select({ _id: 1, date: 1 })
      if (workouts && workouts.length !== 0) {
        res.json(workouts)
      } else {
        res.json([{ error: 'no exercises during period' }])
      }
    } catch (exception) {
      next(exception)
    }
  }
})

module.exports = workoutsRouter
