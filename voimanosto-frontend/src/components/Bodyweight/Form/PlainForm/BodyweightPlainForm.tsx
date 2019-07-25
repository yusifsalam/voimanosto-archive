import React from 'react'
import { Form, Button } from 'semantic-ui-react'

interface BodyweightPlainFormProps {
  setBodyweight(value: number): void
  addBodyweight(): void
  btnText: string
  setOpen(value: boolean): void
}

const BodyweightPlainForm: React.FC<BodyweightPlainFormProps> = ({
  setBodyweight,
  addBodyweight,
  btnText,
  setOpen
}) => {
  return (
    <Form>
      <Form.Input
        placeholder='Bodyweight'
        type='number'
        step='0.01'
        min='0'
        onChange={({ target }) => setBodyweight(Number(target.value))}
      />
      <Button.Group>
        <Button inverted color='green' type='submit' onClick={addBodyweight}>
          {btnText} bodyiweght
        </Button>
        <Button inverted color='red' onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </Button.Group>
    </Form>
  )
}

export default BodyweightPlainForm
