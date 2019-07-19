import React, { useEffect } from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import PointCalculator from '../PointCalculator'
import UserProfile from '../UserProfile'
import UserSettings from '../UserSettings'
import CustomCalendar from '../Calendar'
import RegistrationForm from '../RegistrationForm'
import useReactRouter from 'use-react-router'

interface IRouter {
  loggedIn?: boolean
  user?: IUser | null
  setUser(user: IUser): void
  redirectURL: string
}

const RouterLinks: React.FC<IRouter> = ({
  loggedIn,
  user,
  setUser,
  redirectURL
}) => {
  const { history } = useReactRouter()

  useEffect(() => {
    if (loggedIn && (redirectURL === '/login' || redirectURL === '/'))
      history.push('/profile')
    else if (!loggedIn && redirectURL === '/') history.push('/login')
  }, [redirectURL, loggedIn, history])
  return (
    <div>
      {loggedIn ? (
        <div>
          <Switch>
            <Route
              path='/profile'
              render={props => <UserProfile {...props} user={user} />}
            />
            <Route
              path='/tools'
              render={props => <PointCalculator {...props} moi={false} />}
            />
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
          <Route
            path='/signed-out'
            render={() => (
              <div>
                <h2>You have signed out</h2>
                <Link to='/login'>Login again</Link>
              </div>
            )}
          />
        </div>
      )}
    </div>
  )
}

export default RouterLinks
