import React from 'react'
import './MainContent.scss'
import { Route, Switch, Redirect } from 'react-router-dom'
import PointCalculator from '../PointCalculator'
import UserProfile from '../UserProfile'
import UserSettings from '../UserSettings'
import CustomCalendar from '../Calendar'

const MainContent: React.FC = () => {
  let isMobile = false //initiate as false
  if (
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
      navigator.userAgent
    )
  )
    isMobile = true

  return (
    <div className='main-content'>
      {isMobile ? <h1>You're on mobile</h1> : <h1>You're on desktop</h1>}
      <Switch>
        <Route path='/profile' component={UserProfile} />
        <Route path='/calculator' component={PointCalculator} />
        <Route path='/settings' component={UserSettings} />
        <Route path='/calendar' component={CustomCalendar} />
        <Redirect path='/' to='/profile' />
      </Switch>
    </div>
  )
}

export default MainContent
