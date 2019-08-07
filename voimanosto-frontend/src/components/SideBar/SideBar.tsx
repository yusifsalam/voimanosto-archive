import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { Icon, Menu } from 'semantic-ui-react'
import { UserContext } from '../../context/userContext'
import './SideBar.scss'

interface SideBarProps {
  isMobile: boolean
}

const SideBar: React.FC<SideBarProps> = ({ isMobile }) => {
  const { user } = useContext(UserContext)
  const loggedIn = user.loggedIn
  return (
    <div>
      {loggedIn ? (
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
            to={loggedIn ? '/dashboard' : '/login'}
          >
            <i className='ui icon tachometer alternate' />
            <p className='white-font'>Dashboard</p>
          </Menu.Item>
          <Menu.Item
            disabled={!loggedIn}
            as={NavLink}
            to={loggedIn ? '/profile' : '/login'}
          >
            <i className='ui icon user tie' />
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
            <i className='ui icon toolbox' />
            Tools
          </Menu.Item>
          <Menu.Item
            disabled={!loggedIn}
            as={NavLink}
            to={loggedIn ? '/settings' : '/login'}
          >
            <Icon name='settings' />
            Settings
          </Menu.Item>
        </Menu>
      ) : (
        <div />
      )}
    </div>
  )
}

export default SideBar
