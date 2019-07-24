const Exercise = require('../models/exercise')

const exercises = async user => {
  const squat = new Exercise({
    type: 'sbd',
    name: 'Squat',
    variation: 'Competition',
    prs: [],
    user: user._id
  })
  const bench = new Exercise({
    type: 'sbd',
    name: 'Bench',
    variation: 'Competition',
    prs: [],
    user: user._id
  })
  const deadlift = new Exercise({
    type: 'sbd',
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
