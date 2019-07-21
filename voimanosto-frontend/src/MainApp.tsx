import React, { useState, useEffect } from 'react'
import TopMenu from './components/TopMenu'
import SideBar from './components/SideBar'
import MainContent from './components/MainContent'
import logo from './components/PointCalculator/new_logo.svg'
import workoutService from './services/workoutService'
import loginService from './services/loginService'
import useReactRouter from 'use-react-router'
import { Container } from 'semantic-ui-react'
import 'fomantic-ui-css/semantic.css'
import './styles/basic_labels.css'

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState<null | IUser>(null)
  const [isMobile, setIsMobile] = useState(false)
  const { location } = useReactRouter()

  function updateDimensions() {
    if (window.innerWidth <= 900) {
      setIsMobile(true)
    } else setIsMobile(false)
  }

  let redirectURL = location.pathname

  useEffect(() => {
    const verifyUser = async () => {
      const loggedUserToken = window.localStorage.getItem('loggedUser')
      if (loggedUserToken) {
        const user = await loginService.verify(loggedUserToken)
        user.token = loggedUserToken
        setUser(user)
        workoutService.setToken(loggedUserToken)
        setLoggedIn(true)
      }
    }

    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
        navigator.userAgent
      )
    ) {
      setIsMobile(true)
      document.body.style.zoom = '80%'
    }

    verifyUser()
    window.addEventListener('resize', updateDimensions)
  }, [])

  return (
    <div id='main-div'>
      <TopMenu logo={logo} />
      <SideBar loggedIn={loggedIn} isMobile={isMobile} />
      <Container textAlign='left' fluid>
        <style>
          {`
      html, body {
        background-color: #1C1C1E !important;
      }`}
        </style>
        <MainContent
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          user={user}
          setUser={setUser}
          isMobile={isMobile}
          redirectURL={redirectURL}
        />
      </Container>
    </div>
  )
}

export default App
