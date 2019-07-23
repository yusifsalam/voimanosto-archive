import React from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'

interface BodyweightPlainFormProps {
  setBodyweight(value: number): void
  addBodyweight(): void
  btnText: string
}

const BodyweightPlainForm: React.FC<BodyweightPlainFormProps> = ({
  setBodyweight,
  addBodyweight,
  btnText
}) => {
  return (
    <Segment
      inverted
      style={{
        left: '40%',
        position: 'fixed',
        top: '20%',
        zIndex: 1200,
        border: '2px white solid'
      }}
    >
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
          {/* <Button inverted color='red' onClick={() => setOpen(false)}>
          Cancel
        </Button> */}
        </Button.Group>
      </Form>
    </Segment>
  )
}

export default BodyweightPlainForm
