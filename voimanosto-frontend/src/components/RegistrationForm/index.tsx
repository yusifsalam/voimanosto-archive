import React, { useState } from 'react'
import { Form, Button } from 'semantic-ui-react'

const RegistrationForm: React.FC = () => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = () => {
    console.log('form sent with ', name, username)
  }
  return (
    <div>
      Register now!!
      <Form onSubmit={handleSubmit}>
        <Form.Input
          icon='user'
          iconPosition='left'
          label='Name'
          placeholder='Name'
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
        <Form.Input
          icon='user plus'
          iconPosition='left'
          label='Username'
          placeholder='Username'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <Form.Input
          icon='envelope'
          iconPosition='left'
          label='Email'
          placeholder='Email'
          value={email}
          onChange={({ target }) => setEmail(target.value)}
        />
        <Form.Input
          icon='lock'
          iconPosition='left'
          label='Password'
          type='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <Form.Input
          icon='lock'
          iconPosition='left'
          label='Confirm Password'
          type='password'
          value={confirmPassword}
          onChange={({ target }) => setConfirmPassword(target.value)}
        />
        <Button type='submit'>Register</Button>
      </Form>
    </div>
  )
}

export default RegistrationForm
