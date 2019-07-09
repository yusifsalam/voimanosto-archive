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
}

const MainContent: React.FC<IMainContentProps> = ({
  loggedIn,
  setLoggedIn,
  user,
  setUser
}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

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
      setLoggedIn(true)
    } catch (exception) {
      setErrorMessage('Login failed')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
      console.log(exception)
    }
  }

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

      <RouterLinks loggedIn={loggedIn} />
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
