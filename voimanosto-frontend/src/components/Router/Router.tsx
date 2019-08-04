import React, { useContext, useEffect } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import { Header } from 'semantic-ui-react'
import useReactRouter from 'use-react-router'
import Bodyweight from '../../components/Bodyweight'
import Competition from '../../components/Competition'
import PointCalculator from '../../components/PointCalculator'
import PRTable from '../../components/PRTable'
import VolumePieChart from '../../components/VolumeCharts/Piechart'
import { UserContext } from '../../context/userContext'
import CustomCalendar from '../../views/Calendar'
import Dashboard from '../../views/Dashboard'
import UserProfile from '../../views/Profile'
import UserSettings from '../../views/Settings'
import Tools from '../../views/Tools'
import RegistrationForm from '../RegistrationForm'

interface IRouter {
  redirectURL: string
}

const RouterLinks: React.FC<IRouter> = ({ redirectURL }) => {
  const { history } = useReactRouter()
  const { user } = useContext(UserContext)

  const loggedIn = user.loggedIn

  useEffect(() => {
    if (loggedIn && (redirectURL === '/login' || redirectURL === '/'))
      history.push('/dashboard')
    else if (!loggedIn && redirectURL === '/') history.push('/login')
  }, [redirectURL, loggedIn, history])
  return (
    <div>
      {loggedIn ? (
        <div>
          <Switch>
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/profile' component={UserProfile} />
            <Route path='/settings' component={UserSettings} />
            <Route path='/calendar' component={CustomCalendar} />
            <Route exact path='/tools' component={Tools} />
            <Route
              exact
              path='/tools/pointsCalculator'
              component={PointCalculator}
            />
            <Route exact path='/tools/bodyweight' component={Bodyweight} />
            <Route exact path='/tools/prs' component={PRTable} />
            <Route exact path='/tools/competitions' component={Competition} />
            <Route exact path='/tools/volume' component={VolumePieChart} />
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
