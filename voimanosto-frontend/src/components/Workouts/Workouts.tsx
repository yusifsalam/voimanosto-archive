import React from 'react'
import moment from 'moment'
import { Accordion } from 'semantic-ui-react'
import Workout from './Workout'

const Workouts: React.FC = () => {
  let currentWeek = []
  let weekStart = moment().startOf('week')
  for (let i = 1; i <= 7; i++) {
    currentWeek.push(moment(weekStart).add(i, 'days'))
  }
  console.log(currentWeek)
  return (
    <Accordion inverted exclusive={false}>
      {currentWeek.map((date, i) => (
        <div key={i}>
          <Accordion.Title key={i + 'title'}>
            {moment(date).format('MMM Do')}
          </Accordion.Title>
          <Workout key={i + 'workout'} date={date.toDate()} exercises={[]} />
        </div>
      ))}
    </Accordion>
  )
}

export default Workouts
