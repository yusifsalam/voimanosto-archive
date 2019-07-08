import React from 'react'
import TopMenu from './components/TopMenu'
import SideBar from './components/SideBar'
import MainContent from './components/MainContent'
import logo from './components/PointCalculator/new_logo.svg'

const App: React.FC = () => {
  return (
    <div>
      <TopMenu logo={logo} />
      <SideBar />
      <MainContent />
    </div>
  )
}

export default App
