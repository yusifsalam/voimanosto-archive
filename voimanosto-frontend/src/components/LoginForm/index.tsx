import React from 'react'
import {
  Segment,
  Grid,
  Form,
  Button,
  Divider,
  Message
} from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import { ILoginProps } from '../../types'

const LoginForm: React.FC<ILoginProps> = ({
  username,
  password,
  errorMessage,
  handleLogin,
  setUsername,
  setPassword
}) => {
  return (
    <div>
      <h2>Login</h2>
      {errorMessage !== null ? (
        <Message negative>
          <Message.Header>Something went wrong</Message.Header>
          <p>{errorMessage}</p>
        </Message>
      ) : (
        <div> </div>
      )}
      <Segment placeholder>
        <Grid columns={2} relaxed='very' stackable>
          <Grid.Column>
            <Form onSubmit={handleLogin}>
              <Form.Input
                icon='user'
                iconPosition='left'
                label='Username'
                placeholder='Username'
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
              <Form.Input
                icon='lock'
                iconPosition='left'
                label='Password'
                type='password'
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />

              <Button content='Login' primary />
            </Form>
          </Grid.Column>

          <Grid.Column verticalAlign='middle'>
            <Button
              as={NavLink}
              to='/register'
              content='Sign up'
              icon='signup'
              size='big'
            />
          </Grid.Column>
        </Grid>

        <Divider vertical>Or</Divider>
      </Segment>
    </div>
  )
}

export default LoginForm
