const userVolumeAllTime = userId => {
  return [
    {
      $match: {
        user: userId
      }
    },
    {
      $lookup: {
        from: 'exercises',
        localField: 'exercise',
        foreignField: '_id',
        as: 'exercise'
      }
    },
    {
      $lookup: {
        from: 'workouts',
        localField: 'workout',
        foreignField: '_id',
        as: 'workout'
      }
    },
    {
      $unwind: {
        path: '$exercise',
        includeArrayIndex: 'string',
        preserveNullAndEmptyArrays: false
      }
    },
    {
      $unwind: {
        path: '$workout',
        includeArrayIndex: 'string',
        preserveNullAndEmptyArrays: false
      }
    },
    {
      $addFields: {
        nl: {
          $multiply: ['$reps', '$sets']
        },
        volume: {
          $multiply: ['$reps', '$sets', '$weight']
        }
      }
    },
    // {
    //   $match: {
    //     'exercise.variation': 'Competition'
    //   }
    // },
    {
      $group: {
        _id: '$exercise.name',
        volume: {
          $sum: '$volume'
        },
        nl: {
          $sum: '$nl'
        },
        weight: {
          $avg: '$weight'
        }
      }
    },
    { $sort: { _id: 1 } }
  ]
}

module.exports = { userVolumeAllTime }
