import React, { useState, useEffect } from 'react'
import TopMenu from './components/TopMenu'
import SideBar from './components/SideBar'
import MainContent from './components/MainContent'
import logo from './components/PointCalculator/new_logo.svg'
import workoutService from './services/workoutService'
import { IUser } from './types'

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState<null | IUser>(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      workoutService.setToken(user.token)
      setLoggedIn(true)
    }
  }, [])

  return (
    <div>
      <TopMenu logo={logo} />
      <SideBar loggedIn={loggedIn} />
      <MainContent
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        user={user}
        setUser={setUser}
      />
    </div>
  )
}

export default App
