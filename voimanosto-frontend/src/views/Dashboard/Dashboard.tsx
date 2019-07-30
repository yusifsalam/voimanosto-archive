import React, { useContext, useState } from 'react'
import moment from 'moment'
import { UserContext } from '../../context/userContext'
import { Header, Checkbox } from 'semantic-ui-react'
import Workout from '../../components/Workouts/Workout'
import Workouts from '../../components/Workouts'

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
