import React, { useState } from 'react'
import { Form, Button, Message } from 'semantic-ui-react'
import EmailValidator from 'email-validator'
import registrationService from '../../services/registrationService'

const RegistrationForm: React.FC = () => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [nameError, setNameError] = useState<string | boolean>(false)
  const [usernameError, setUsernameError] = useState<string | boolean>(false)
  const [emailError, setEmailError] = useState<string | boolean>(false)
  const [passwordError, setPasswordError] = useState<string | boolean>(false)
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | boolean
  >(false)

  const emptyFields = () => {
    setName('')
    setUsername('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    if (nameError || usernameError || emailError)
      setErrorMessage('Invalid field values present!')
    else if (password !== confirmPassword)
      setErrorMessage('Passwords do not match')
    else {
      try {
        const user = await registrationService.register({
          username,
          name,
          email,
          password
        })
        emptyFields()

        setSuccessMessage(`Registration successful for ${user.name}`)
      } catch (exception) {
        setErrorMessage(exception.response.data.error)
      }
    }
    setTimeout(() => {
      setSuccessMessage(null)
      setErrorMessage(null)
    }, 3000)
  }

  const validateName = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault()
    let newName = event.currentTarget.value
    if (newName.length < 3) setNameError('Name too short')
    else setNameError(false)
  }

  const validateUsername = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault()
    if (username.length < 3) setUsernameError('Username too short')
    else setUsernameError(false)
  }

  const validateEmail = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault()
    let validEmail = EmailValidator.validate(email)
    if (!validEmail) setEmailError('Invalid email address')
    else setEmailError(false)
  }

  const validatePassword = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault()
    if (password === '') setPasswordError('Password cannot be empty')
    else if (password.length < 5)
      setPasswordError('Password must contain at least 5 symbols')
    else setPasswordError(false)
  }
  const validateConfirmPassword = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    event.preventDefault()
    if (confirmPassword === '')
      setConfirmPasswordError('Password cannot be empty')
    else if (confirmPassword.length < 5)
      setConfirmPasswordError('Password must contain at least 5 symbols')
    else setConfirmPasswordError(false)
  }

  return (
    <div>
      {errorMessage === null ? (
        <div />
      ) : (
        <Message negative>{errorMessage}</Message>
      )}
      {successMessage === null ? (
        <div />
      ) : (
        <Message positive>{successMessage}</Message>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Input
          error={nameError}
          icon='user'
          iconPosition='left'
          label='Name'
          placeholder='Name'
          value={name}
          onChange={({ target }) => setName(target.value)}
          onBlur={validateName}
        />
        <Form.Input
          error={usernameError}
          icon='user plus'
          iconPosition='left'
          label='Username'
          placeholder='Username'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          onBlur={validateUsername}
        />
        <Form.Input
          error={emailError}
          icon='envelope'
          iconPosition='left'
          label='Email'
          placeholder='Email'
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          onBlur={validateEmail}
        />
        <Form.Input
          error={passwordError}
          icon='lock'
          iconPosition='left'
          label='Password'
          type='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          onBlur={validatePassword}
        />
        <Form.Input
          error={confirmPasswordError}
          icon='lock'
          iconPosition='left'
          label='Confirm Password'
          type='password'
          value={confirmPassword}
          onChange={({ target }) => setConfirmPassword(target.value)}
          onBlur={validateConfirmPassword}
        />
        <Button type='submit'>Register</Button>
      </Form>
    </div>
  )
}

export default RegistrationForm
