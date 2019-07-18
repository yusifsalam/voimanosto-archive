import React from 'react'
import Lottie from 'react-lottie'
import animationData from './success.json'

const SuccessLottie: React.FC = () => {
  const defaultOptions = {
    loop: true,
    autoplay: false,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }
  return <Lottie options={defaultOptions} height={150} width={150} />
}

export default SuccessLottie
