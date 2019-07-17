import React, { useState } from 'react'
import './MainContent.scss'
import RouterLinks from '../Router'
import { IUser } from '../../types'
import loginService from '../../services/loginService'
import workoutService from '../../services/workoutService'
import { Route } from 'react-router-dom'
import LoginForm from '../LoginForm'

interface IMainContentProps {
  user: IUser | null
  loggedIn?: boolean
  setLoggedIn(loggedIn: boolean): void
  setUser(user: IUser): void
  isMobile: boolean
  redirectURL: string
}

const MainContent: React.FC<IMainContentProps> = ({
  loggedIn,
  setLoggedIn,
  user,
  setUser,
  isMobile,
  redirectURL
}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem('loggedUser', user.token)
      workoutService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setLoggedIn(true)
    } catch (exception) {
      setErrorMessage('Login failed')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
      console.log(exception)
    }
  }

  return (
    <div className={isMobile ? 'main-content mobile' : 'main-content'}>
      <RouterLinks
        loggedIn={loggedIn}
        user={user}
        setUser={setUser}
        redirectURL={redirectURL}
      />
      <Route
        path='/login'
        render={props => (
          <LoginForm
            {...props}
            username={username}
            password={password}
            handleLogin={handleLogin}
            setPassword={setPassword}
            setUsername={setUsername}
            errorMessage={errorMessage}
          />
        )}
      />
    </div>
  )
}

export default MainContent
