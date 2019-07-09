import React, { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import TopMenu from './components/TopMenu'
import SideBar from './components/SideBar'
import MainContent from './components/MainContent'
import logo from './components/PointCalculator/new_logo.svg'
import { IUser } from './types'
import loginService from './services/login'
import workoutService from './services/workoutService'

const App: React.FC = () => {
  const [user, setUser] = useState<IUser | null>(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      workoutService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      workoutService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
    }
  }

  return (
    <div>
      {user === null ? (
        <LoginForm
          username={username}
          password={password}
          handleLogin={handleLogin}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      ) : (
        <div>
          <TopMenu logo={logo} />
          <SideBar />
          <MainContent />
        </div>
      )}
    </div>
  )
}

export default App
