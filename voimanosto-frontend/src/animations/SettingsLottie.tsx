import React from 'react'
import Lottie from 'react-lottie'
import animationData from './settingsLottie.json'

const SettingsLottie: React.FC = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }
  return <Lottie options={defaultOptions} height={50} width={50} />
}

export default SettingsLottie
