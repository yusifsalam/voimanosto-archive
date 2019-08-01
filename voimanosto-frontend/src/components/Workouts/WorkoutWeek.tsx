import moment from 'moment'
import React from 'react'
import { Accordion } from 'semantic-ui-react'
import Workout from './Workout'

const WorkoutWeek: React.FC = () => {
  let currentWeek = []
  let weekStart = moment().startOf('week')
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
