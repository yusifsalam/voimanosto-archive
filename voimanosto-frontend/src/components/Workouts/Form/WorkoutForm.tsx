import React from 'react'
import { Modal, TransitionablePortal } from 'semantic-ui-react'
import WorkoutPlainForm from './PlainForm'

interface WorkoutFormProps {
  open: boolean
  setOpen(value: boolean): void
  date: Date
}

const WorkoutForm: React.FC<WorkoutFormProps> = ({ open, setOpen, date }) => {
  return (
    <TransitionablePortal open={open}>
      <Modal open={true} centered={false} className='inverted'>
        <Modal.Header>Add new workout</Modal.Header>
        <Modal.Content>
          <WorkoutPlainForm setOpen={setOpen} date={date} />
        </Modal.Content>
      </Modal>
    </TransitionablePortal>
  )
}

export default WorkoutForm
