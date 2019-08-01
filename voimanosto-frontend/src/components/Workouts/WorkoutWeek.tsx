import moment from 'moment'
import React from 'react'
import { Accordion } from 'semantic-ui-react'
import Workout from './Workout'

interface WorkoutWeekProps {
  startDate: Date
}

const WorkoutWeek: React.FC<WorkoutWeekProps> = ({ startDate }) => {
  let currentWeek = []
  let weekStart = moment(startDate).startOf('week')
  for (let i = 1; i <= 7; i++) {
    currentWeek.push(moment(weekStart).add(i, 'days'))
  }
  return (
    <Accordion inverted exclusive={false}>
      {currentWeek.map((date, i) => (
        <div key={i}>
          <p />
          <Workout key={i + 'workout'} date={date.toDate()} />
        </div>
      ))}
    </Accordion>
  )
}

export default WorkoutWeek
