import React from 'react'
import { TransitionablePortal, Segment, Form, Button } from 'semantic-ui-react'

interface BodyweightFormProps {
  open: boolean
  setOpen(value: boolean): void
  setBodyweight(value: number): void
  addBodyweight(): void
  btnText: string
}

const BodyweightForm: React.FC<BodyweightFormProps> = ({
  open,
  setOpen,
  setBodyweight,
  addBodyweight,
  btnText
}) => {
  return (
    <TransitionablePortal open={open} onClose={() => setOpen(false)}>
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
            <Button
              inverted
              color='green'
              type='submit'
              onClick={addBodyweight}
            >
              {btnText} bodyiweght
            </Button>
            <Button inverted color='red' onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </Button.Group>
        </Form>
      </Segment>
    </TransitionablePortal>
  )
}

export default BodyweightForm
