import React from 'react'
import CompetitionPlainForm from './PlainForm'
import { TransitionablePortal, Segment } from 'semantic-ui-react'

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
        <CompetitionPlainForm setOpen={setOpen} date={date} />
      </Segment>
    </TransitionablePortal>
  )
}

export default CompetitionForm
