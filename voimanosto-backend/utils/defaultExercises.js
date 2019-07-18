const Exercise = require('../models/exercise')

const exercises = async user => {
  const squat = new Exercise({
    etype: 'sbd',
    name: 'Squat',
    variation: 'Competition',
    prs: [],
    user: user._id
  })
  const bench = new Exercise({
    etype: 'sbd',
    name: 'Benchpress',
    variation: 'Competition',
    prs: [],
    user: user._id
  })
  const deadlift = new Exercise({
    etype: 'sbd',
    name: 'Deadlift',
    variation: 'Competition',
    prs: [],
    user: user._id
  })
  await squat.save()
  await bench.save()
  await deadlift.save()
  return [squat, bench, deadlift]
}

module.exports = exercises
