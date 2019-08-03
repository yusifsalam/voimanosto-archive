import moment from 'moment'
import React, { useContext, useState } from 'react'
import Calendar from 'react-calendar'
import { Button, Checkbox, Form, Header } from 'semantic-ui-react'
import WorkoutWeek from '../../components/Workouts'
import Workout from '../../components/Workouts/Workout'
import { UserContext } from '../../context/userContext'

const Dashboard: React.FC = () => {
  const { user } = useContext(UserContext)
  const [checked, setChecked] = useState(false)
  const [startDate, setStartDate] = useState<Date>(
    moment()
      .startOf('day')
      .toDate()
  )
  const [showCalendar, setShowCalendar] = useState(false)
  return (
    <div>
      <Header inverted as='h3'>
        Hi, {user.name} 👋🏻
      </Header>
      <Header inverted as='h5'>
        Today is {moment().format('MMMM DD, YYYY')}
      </Header>
      <Form>
        <Form.Field inline>
          <div>
            <label style={{ color: 'white', marginRight: '1em' }}> Daily</label>
            <Checkbox
              toggle
              checked={checked}
              onChange={() => setChecked(!checked)}
              className='inverted'
              label='Weekly'
            />
            <Button
              inverted
              color='blue'
              content={showCalendar ? 'Hide calendar' : 'Show calendar'}
              onClick={() => setShowCalendar(!showCalendar)}
              style={{ marginLeft: '10px' }}
            />
          </div>
        </Form.Field>
      </Form>
      <p />

      {showCalendar ? (
        <div style={{ width: '400px', marginTop: '10px' }}>
          <Calendar className='mini' onClickDay={setStartDate} />
        </div>
      ) : (
        <div />
      )}
      <p />
      {!checked ? (
        <Workout date={startDate} />
      ) : (
        <WorkoutWeek startDate={startDate} />
      )}
    </div>
  )
}
export default Dashboard
