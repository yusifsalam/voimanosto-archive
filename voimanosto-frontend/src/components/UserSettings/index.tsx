import React, { useState } from 'react'
import axios from 'axios'
import { IUser } from '../../types'

interface UserSettingsProps {
  user?: IUser | null
  setUser(user: IUser): void
}

const UserSettings: React.FC<UserSettingsProps> = ({ user, setUser }) => {
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: any) => {
    setFile(e[0])
  }

  const handleFileUpload = () => {
    const selectedFile = file as File
    console.log(selectedFile)
    const formData = new FormData()
    formData.append('file', selectedFile)
    if (user !== null && user !== undefined) {
      formData.append('username', user.username)
      formData.append('token', user.token)
    }

    axios
      .post('/img_upload', formData, {
        onUploadProgress: progressEvent => {
          console.log(progressEvent.loaded / progressEvent.total)
        }
      })
      .then(newUser => {
        setUser(newUser.data)
        window.localStorage.setItem('loggedUser', JSON.stringify(newUser.data))
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
    </div>
  )
}

export default UserSettings