import React, { useState } from 'react'
import axios from 'axios'
import { Header, Container, Button } from 'semantic-ui-react'
import './UserSettings.scss'

interface UserSettingsProps {
  user?: IUser | null
  setUser(user: IUser): void
}

const UserSettings: React.FC<UserSettingsProps> = ({ user, setUser }) => {
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: any) => {
    setFile(e[0])
  }

  const handleFileUpload = async () => {
    const selectedFile = file as File
    console.log(selectedFile)
    const formData = new FormData()
    formData.append('file', selectedFile)
    if (user !== null && user !== undefined) {
      formData.append('username', user.username)
      formData.append('token', user.token)
    }

    await axios
      .post('/img_upload', formData, {
        onUploadProgress: progressEvent => {
          console.log(progressEvent.loaded / progressEvent.total)
        }
      })
      .then(newUser => {
        setUser(newUser.data)
        setFile(null)
      })
  }
  return (
    <Container>
      <Header inverted as='h2'>
        Set your profile picture
      </Header>
      <div>
        <input
          id='file'
          type='file'
          onChange={e => handleFileChange(e.target.files)}
        />
        <label htmlFor='file' className='btn-2'>
          <span>Select image</span>
        </label>
        <Header inverted as='h5'>
          {file ? (
            <div>
              File: {file.name}
              <br /> Size: {(file.size / 1024).toFixed(1)} kb
            </div>
          ) : null}
        </Header>
      </div>
      <br />
      <Button inverted color='violet' type='submit' onClick={handleFileUpload}>
        Submit
      </Button>
    </Container>
  )
}

export default UserSettings
