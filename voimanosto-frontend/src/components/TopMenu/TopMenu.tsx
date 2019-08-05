import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { Button, Header, Icon, Image, Menu } from 'semantic-ui-react'
import useReactRouter from 'use-react-router'
import { UserContext } from '../../context/userContext'
import './TopMenu.scss'

interface TopMenuProps {
  logo: string
}

const TopMenu: React.FC<TopMenuProps> = ({ logo }) => {
  const { history } = useReactRouter()
  const { user, setUser } = useContext(UserContext)
  const loggedIn = user.loggedIn
  return (
    <Menu inverted fixed='top' borderless className='top-menu'>
      <Menu.Item header className='logo'>
        <Header className='headerInLogo' as={NavLink} to='/'>
          Voimanosto
        </Header>
        <Image src={logo} size='mini' />
      </Menu.Item>
      <Menu.Menu position='right'>
        <Menu.Item>
          {loggedIn ? (
            <Menu.Item as={NavLink} to='/notifications'>
              <div className='ui blue basic label'>
                <i className='ui big icon bell outline ' />2
              </div>
            </Menu.Item>
          ) : (
            <div />
          )}
          <Menu.Item>
            {loggedIn ? (
              <Button
                inverted
                icon
                color='red'
                onClick={() => {
                  setUser({
                    name: '',
                    username: '',
                    avatar: '',
                    email: '',
                    token: '',
                    loggedIn: false
                  })
                  window.localStorage.removeItem('loggedUser')
                  history.push('/signed-out')
                  window.location.reload()
                }}
              >
                Log out <Icon name='sign-out' />
              </Button>
            ) : (
              <Button inverted icon color='green' as={NavLink} to='/login'>
                Log In <Icon name='sign in' />
              </Button>
            )}
          </Menu.Item>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}

export default TopMenu
