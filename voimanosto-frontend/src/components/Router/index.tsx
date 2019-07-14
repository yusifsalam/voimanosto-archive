import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import PointCalculator from '../PointCalculator'
import UserProfile from '../UserProfile'
import UserSettings from '../UserSettings'
import CustomCalendar from '../Calendar'
import RegistrationForm from '../RegistrationForm'
import { IUser } from '../../types'

interface IRouter {
  loggedIn?: boolean
  user?: IUser | null
  setUser(user: IUser): void
}

const RouterLinks: React.FC<IRouter> = ({ loggedIn, user, setUser }) => {
  return (
    <div>
      {loggedIn ? (
        <div>
          <Redirect path='/' to='/profile' />
          <Switch>
            <Route
              path='/profile'
              render={props => <UserProfile {...props} user={user} />}
            />
            <Route path='/calculator' component={PointCalculator} />
            <Route
              path='/settings'
              render={props => (
                <UserSettings {...props} user={user} setUser={setUser} />
              )}
            />
            <Route
              path='/calendar'
              render={props => <CustomCalendar {...props} user={user} />}
            />
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
