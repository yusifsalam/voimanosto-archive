/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { FormikErrors, FormikProps, withFormik } from 'formik'
import React from 'react'
import { Button, Form, Message } from 'semantic-ui-react'
import registrationService from 'services/registrationService'
import * as yup from 'yup'

interface FormValues {
  name: string
  username: string
  email: string
  password: string
  confirmPassword: string
}

interface Props {
  submit?: (values: FormValues) => Promise<FormikErrors<FormValues> | null>
}

const RegistrationSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'Name too short!')
    .max(25, 'Name too long!')
    .required('Name is a required field!'),
  username: yup
    .string()
    .min(3, 'Username too short')
    .max(10, 'Username too long!')
    .required('Username is a required field'),
  email: yup
    .string()
    .email('Invalid email')
    .required('Email is required!'),
  password: yup
    .string()
    .min(5, 'Password too short')
    .max(25, 'Password too long')
    .required('Password missing'),
  confirmPassword: yup
    .string()
    .min(5, 'Too short')
    .max(25, 'Too long')
    .test('passwords-match', 'Passwords must match', function(value) {
      return this.parent.password === value
    })
    .required('Please confirm the password'),
})

class RegistrationForm extends React.PureComponent<Props & FormikProps<FormValues>> {
  render(): React.ReactNode {
    const { status, values, handleChange, handleBlur, touched, errors, handleSubmit } = this.props
    return (
      <div>
        <Message error content={status && status.msg} hidden={!status} />
        <Form inverted onSubmit={handleSubmit}>
          <Form.Input
            name="name"
            icon="user"
            iconPosition="left"
            label="Name"
            placeholder="Name"
            error={touched.name && errors.name}
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Form.Input
            name="username"
            icon="user plus"
            iconPosition="left"
            label="Username"
            placeholder="Username"
            error={touched.username && errors.username}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Form.Input
            name="email"
            icon="envelope"
            iconPosition="left"
            label="Email"
            placeholder="Email"
            error={touched.email && errors.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Form.Input
            name="password"
            icon="lock"
            iconPosition="left"
            label="Password"
            type="password"
            error={touched.password && errors.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Form.Input
            name="confirmPassword"
            icon="lock"
            iconPosition="left"
            label="Confirm Password"
            type="password"
            error={touched.confirmPassword && errors.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Button inverted color="green" type="submit">
            Register
          </Button>
        </Form>
      </div>
    )
  }
}

interface MyFormProps {
  initialEmail?: string
}

const ValidatedForm = withFormik<MyFormProps, FormValues>({
  validationSchema: RegistrationSchema,
  mapPropsToValues: () => ({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  }),
  handleSubmit: async (values, { setStatus, resetForm }) => {
    try {
      const user = await registrationService.register(values)
      if (user.error) {
        setStatus(user.error)
      } else {
        resetForm()
      }
    } catch (exception) {
      setStatus({ msg: 'Registration failed! Perhaps the username is taken' })
      setTimeout(() => {
        setStatus(undefined)
      }, 3000)
    }
  },
})(RegistrationForm)

export default ValidatedForm
