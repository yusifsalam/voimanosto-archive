import React, { useEffect, useContext } from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import PointCalculator from '../PointCalculator'
import UserProfile from '../../views/UserProfile'
import UserSettings from '../../views/UserSettings'
import CustomCalendar from '../../views/Calendar'
import RegistrationForm from '../RegistrationForm'
import Dashboard from '../../views/Dashboard'
import useReactRouter from 'use-react-router'
import { UserContext } from '../../context/userContext'
import { Header } from 'semantic-ui-react'

interface IRouter {
  redirectURL: string
}

const RouterLinks: React.FC<IRouter> = ({ redirectURL }) => {
  const { history } = useReactRouter()
  const { user } = useContext(UserContext)

  const loggedIn = user.loggedIn

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
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/profile' component={UserProfile} />
            <Route path='/tools' component={PointCalculator} />
            <Route path='/settings' component={UserSettings} />
            <Route path='/calendar' component={CustomCalendar} />
          </Switch>
        </div>
      ) : (
        <div>
          <Route path='/register' component={RegistrationForm} />
          <Route
            path='/signed-out'
            render={() => (
              <div>
                <Header inverted as='h2'>
                  You have signed out
                </Header>
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
