import React from 'react'
import { Modal, TransitionablePortal } from 'semantic-ui-react'
import CompetitionPlainForm from './PlainForm'

interface CompetitionFormProps {
  open: boolean
  setOpen(value: boolean): void
  date: Date
}

const CompetitionForm: React.FC<CompetitionFormProps> = ({
  open,
  setOpen,
  date
}) => {
  return (
    <TransitionablePortal open={open}>
      <Modal open={true} className='inverted' centered={false}>
        <Modal.Header>Add competition</Modal.Header>
        <Modal.Content>
          <CompetitionPlainForm setOpen={setOpen} date={date} />
        </Modal.Content>
      </Modal>
    </TransitionablePortal>
  )
}

export default CompetitionForm
