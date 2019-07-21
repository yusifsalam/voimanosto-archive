import React from 'react'
import './TopMenu.scss'
import { Menu, Image, Button, Icon, Header } from 'semantic-ui-react'
import useReactRouter from 'use-react-router'
import { NavLink } from 'react-router-dom'

interface TopMenuProps {
  logo: string
}

const TopMenu: React.FC<TopMenuProps> = ({ logo }) => {
  const { history } = useReactRouter()
  return (
    <Menu inverted fixed='top' borderless className='top-menu'>
      <Menu.Item header className='logo'>
        <Image src={logo} size='tiny' />
        <Header className='headerInLogo' as={NavLink} to='/'>
          Voimanosto
        </Header>
      </Menu.Item>
      <Menu.Menu position='right'>
        <Menu.Item>
          <Menu.Item as={NavLink} to='/notifications'>
            <div className='ui blue basic label'>
              <i className='ui big icon bell outline ' />2
            </div>
          </Menu.Item>
          <Menu.Item>
            <Button
              inverted
              icon
              color='red'
              onClick={() => {
                window.localStorage.removeItem('loggedUser')
                history.push('/signed-out')
                window.location.reload()
              }}
            >
              Log out <Icon name='sign-out' />
            </Button>
          </Menu.Item>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}

export default TopMenu
