import moment from 'moment'
import React, { useContext, useState } from 'react'
import { Checkbox, Header } from 'semantic-ui-react'
import Workouts from '../../components/Workouts'
import Workout from '../../components/Workouts/Workout'
import { UserContext } from '../../context/userContext'

const Dashboard: React.FC = () => {
  const { user } = useContext(UserContext)
  const [checked, setChecked] = useState(false)
  return (
    <div>
      <Header inverted as='h3'>
        Hi, {user.name} 👋🏻
      </Header>
      <Header inverted as='h5'>
        Today is {moment().format('MMMM DD, YYYY')}
      </Header>
      {/* <Workout date={moment().toDate()} exercises={[]} /> */}
      <Header inverted as='h5'>
        Daily
        <Checkbox
          slider
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
        Weekly
      </Header>
      {!checked ? (
        <Workout date={moment().toDate()} exercises={[]} />
      ) : (
        <Workouts />
      )}
    </div>
  )
}
export default Dashboard
