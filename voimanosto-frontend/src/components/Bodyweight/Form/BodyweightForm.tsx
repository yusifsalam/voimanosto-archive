import React from 'react'
import { TransitionablePortal, Segment } from 'semantic-ui-react'
import BodyweightPlainForm from './PlainForm'

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
        <BodyweightPlainForm
          setBodyweight={setBodyweight}
          addBodyweight={addBodyweight}
          btnText={btnText}
          setOpen={setOpen}
        />
      </Segment>
    </TransitionablePortal>
  )
}

export default BodyweightForm
