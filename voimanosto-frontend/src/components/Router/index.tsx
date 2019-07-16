import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import PointCalculator from '../PointCalculator'
import UserProfile from '../UserProfile'
import UserSettings from '../UserSettings'
import CustomCalendar from '../Calendar'
import RegistrationForm from '../RegistrationForm'
import { IUser } from '../../types'
import useReactRouter from 'use-react-router'

interface IRouter {
  loggedIn?: boolean
  user?: IUser | null
  setUser(user: IUser): void
}

const RouterLinks: React.FC<IRouter> = ({ loggedIn, user, setUser }) => {
  const { history } = useReactRouter()

  useEffect(() => {
    if (!loggedIn) {
      history.push('/login')
    } else {
      history.goBack()
    }
  }, [loggedIn, history])
  return (
    <div>
      {loggedIn ? (
        <div>
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
        </div>
      )}
    </div>
  )
}

export default RouterLinks
