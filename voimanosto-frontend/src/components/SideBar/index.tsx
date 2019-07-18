import React from 'react'
import './SideBar.scss'
import { Menu, Icon } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
// import SettingsLottie from '../../animations/SettingsLottie'

interface SideBarProps {
  loggedIn?: boolean
  isMobile: boolean
}

const SideBar: React.FC<SideBarProps> = ({ loggedIn, isMobile }) => {
  return (
    <Menu
      inverted
      borderless
      vertical={isMobile ? false : true}
      stackable={isMobile ? false : true}
      fixed={isMobile ? 'bottom' : 'left'}
      className={isMobile ? 'side-bar mobile' : 'side-bar'}
      icon='labeled'
    >
      <Menu.Item
        disabled={!loggedIn}
        as={NavLink}
        to={loggedIn ? '/profile' : '/login'}
      >
        <Icon name='user' />
        <p className='white-font'>My profile</p>
      </Menu.Item>
      <Menu.Item
        disabled={!loggedIn}
        as={NavLink}
        to={loggedIn ? '/calendar' : '/login'}
      >
        <Icon name='calendar alternate' />
        Calendar
      </Menu.Item>
      <Menu.Item
        disabled={!loggedIn}
        as={NavLink}
        to={loggedIn ? '/tools' : '/login'}
      >
        <Icon name='calculator' />
        Tools
      </Menu.Item>
      <Menu.Item
        disabled={!loggedIn}
        as={NavLink}
        to={loggedIn ? '/settings' : '/login'}
      >
        <Icon name='settings' />
        {/* <SettingsLottie /> */}
        Settings
      </Menu.Item>
    </Menu>
  )
}

export default SideBar
