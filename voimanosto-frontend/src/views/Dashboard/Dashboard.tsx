import React, { useContext } from 'react'
import moment from 'moment'
import { UserContext } from '../../context/userContext'
import { Header } from 'semantic-ui-react'

const Dashboard: React.FC = () => {
  const { user } = useContext(UserContext)
  return (
    <div>
      <Header inverted as='h3'>
        Hi, {user.name} 👋🏻
      </Header>
      <Header inverted as='h5'>
        Today is {moment().format('MMMM DD, YYYY')}
      </Header>
    </div>
  )
}
export default Dashboard
