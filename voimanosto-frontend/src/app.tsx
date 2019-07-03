import React from 'react'
import TopMenu from './components/TopMenu/TopMenu'
import SideBar from './components/SideBar/SideBar'
import MainContent from './components/MainContent/MainContent'
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
