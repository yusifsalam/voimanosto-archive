import React, { useState, useContext } from 'react'
import './MainContent.scss'
import RouterLinks from '../Router'
import loginService from '../../services/loginService'
import workoutService from '../../services/workoutService'
import { Route } from 'react-router-dom'
import LoginForm from '../LoginForm'
import { UserContext } from '../../context/userContext'

interface IMainContentProps {
  isMobile: boolean
  redirectURL: string
}

const MainContent: React.FC<IMainContentProps> = ({
  isMobile,
  redirectURL
}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { setUser } = useContext(UserContext)

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password
      })
      user.loggedIn = true
      window.localStorage.setItem('loggedUser', user.token)
      workoutService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
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
      <RouterLinks redirectURL={redirectURL} />
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
