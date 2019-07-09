import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import PointCalculator from '../PointCalculator'
import UserProfile from '../UserProfile'
import UserSettings from '../UserSettings'
import CustomCalendar from '../Calendar'
import RegistrationForm from '../RegistrationForm'

interface IRouter {
  loggedIn?: boolean
}

const RouterLinks: React.FC<IRouter> = ({ loggedIn }) => {
  return (
    <div>
      {loggedIn ? (
        <div>
          <Redirect path='/' to='/profile' />
          <Switch>
            <Route path='/profile' component={UserProfile} />
            <Route path='/calculator' component={PointCalculator} />
            <Route path='/settings' component={UserSettings} />
            <Route path='/calendar' component={CustomCalendar} />
          </Switch>
        </div>
      ) : (
        <div>
          <Route path='/register' component={RegistrationForm} />
          <Redirect path='/' to='/login' />
        </div>
      )}
    </div>
  )
}

export default RouterLinks
