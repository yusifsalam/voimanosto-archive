import React from 'react'
import { Segment, Grid, Form, Button, Divider } from 'semantic-ui-react'

interface ILoginProps {
  username: string
  password: string
  handleLogin(event: React.FormEvent<HTMLFormElement>): void
  setUsername(username: string): void
  setPassword(password: string): void
}

const LoginForm: React.FC<ILoginProps> = ({
  username,
  password,
  handleLogin,
  setUsername,
  setPassword
}) => {
  return (
    <div>
      <h2>Login</h2>

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
            <Button content='Sign up' icon='signup' size='big' />
          </Grid.Column>
        </Grid>

        <Divider vertical>Or</Divider>
      </Segment>
    </div>
  )
}

export default LoginForm
