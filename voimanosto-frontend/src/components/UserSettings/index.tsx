import React, { useState } from 'react'
import axios from 'axios'
import Lottie from 'react-lottie'
import animationData from '../../animations/settings.json'

const UserSettings = () => {
  const [file, setFile] = useState<File | null>(null)

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  const handleFileChange = (e: any) => {
    setFile(e[0])
  }

  const handleFileUpload = () => {
    const selectedFile = file as File
    console.log(selectedFile)
    const formData = new FormData()
    formData.append('file', selectedFile)

    axios.post('/img_upload', formData, {
      onUploadProgress: progressEvent => {
        console.log(progressEvent.loaded / progressEvent.total)
      }
    })
  }
  return (
    <div>
      <h1>Set your profile picture</h1>
      <input
        type='file'
        onChange={e => handleFileChange(e.target.files)}
      />{' '}
      <button type='submit' onClick={handleFileUpload}>
        Submit
      </button>
      <Lottie options={defaultOptions} height={512} width={512} />
    </div>
  )
}

export default UserSettings
