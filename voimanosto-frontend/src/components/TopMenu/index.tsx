import React from 'react'
import './TopMenu.scss'
import { Menu, Image, Button, Icon, Header } from 'semantic-ui-react'
import useReactRouter from 'use-react-router'

interface TopMenuProps {
  logo: string
}

const TopMenu: React.FC<TopMenuProps> = ({ logo }) => {
  const { history } = useReactRouter()
  return (
    <Menu fixed='top' borderless className='top-menu'>
      <Menu.Item header className='logo'>
        <Image src={logo} size='tiny' />
        <Header className='headerInLogo'>Voimanosto</Header>
      </Menu.Item>
      <Menu.Menu position='right'>
        <Menu.Item>
          <Menu.Item>
            <Button
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
