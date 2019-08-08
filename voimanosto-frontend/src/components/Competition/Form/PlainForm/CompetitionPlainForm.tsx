import { UserContext } from 'context/userContext'
import React, { useContext, useState } from 'react'
import { Dropdown, Form } from 'semantic-ui-react'
import competitionService from 'services/competitionService'
import { calculatePoints, calculateWilks } from '../../../../util'

interface CompetitionPlainFormProps {
  date: Date
  setOpen(value: boolean): void
}

const CompetitionPlainForm: React.FC<CompetitionPlainFormProps> = ({ setOpen, date }) => {
  const compTypes = [
    { key: 'pl', value: 'pl', text: 'Powerlifting' },
    { key: 'pushpull', value: 'pushpull', text: 'Push-pull' },
    { key: 'bp', value: 'bp', text: 'Bench-only' },
    { key: 'dl', value: 'dl', text: 'Deadlift-only' },
    { key: 'sotilas', value: 'sotilas', text: 'Sotilaspenkki' },
  ]
  const { user } = useContext(UserContext)
  const [type, setType] = useState('pl')
  const [name, setName] = useState('')
  const [venue, setVenue] = useState('')
  const [bw, setBw] = useState(-1)
  const [sq, setSq] = useState(-1)
  const [bp, setBp] = useState(-1)
  const [dl, setDl] = useState(-1)

  const handleSubmit = async (): Promise<void> => {
    const ipf = calculatePoints(sq + bp + dl, bw, 'M', 'Raw', 'SBD')
    const wilks = calculateWilks(sq + bp + dl, bw, 'M')
    await competitionService.addComp({
      username: user.username,
      token: user.token,
      name: name,
      venue: venue,
      bodyweight: bw,
      squat: sq,
      bench: bp,
      deadlift: dl,
      date: date,
      type: type,
      wilks: wilks,
      ipf: ipf,
    })

    setOpen(false)
  }

  const handleTypeSelect = (e: React.SyntheticEvent, data: any): void => {
    setType(data.value)
  }

  return (
    <div>
      <Form inverted>
        <Dropdown
          options={compTypes}
          className="inverted"
          clearable
          selection
          placeholder="Competition type"
          value={type}
          onChange={handleTypeSelect}
        />
        <Form.Input
          placeholder="Competition Name"
          type="text"
          value={name}
          onChange={(e, data) => setName(data.value)}
        />
        <Form.Input placeholder="Venue" type="text" value={venue} onChange={(e, data) => setVenue(data.value)} />
        <Form.Input
          placeholder="Bodyweight"
          type="number"
          step="0.01"
          value={bw === -1 ? '' : bw}
          onChange={(e, data) => setBw(Number(data.value))}
          error={bw >= 45 ? false : bw === -1 ? false : { content: 'Minimum value is 45 kg' }}
        />
        <Form.Input
          placeholder="Squat"
          type="number"
          step="2.5"
          min="25"
          value={sq === -1 ? '' : sq}
          onChange={(e, data) => setSq(Number(data.value))}
          error={sq >= 25 ? false : sq === -1 ? false : { content: 'Minimum value is 25 kg' }}
        />
        <Form.Input
          placeholder="Bench"
          type="number"
          step="2.5"
          min="25"
          value={bp === -1 ? '' : bp}
          onChange={(e, data) => setBp(Number(data.value))}
          error={bp >= 25 ? false : bp === -1 ? false : { content: 'Minimum value is 25 kg' }}
        />
        <Form.Input
          error={dl >= 25 ? false : dl === -1 ? false : { content: 'Minimum value is 25 kg' }}
          placeholder="Deadlift"
          type="number"
          step="2.5"
          min="25"
          value={dl === -1 ? '' : dl}
          onChange={(e, data) => setDl(Number(data.value))}
        />
        <Form.Group>
          <Form.Button inverted color="green" onClick={handleSubmit}>
            Add competition
          </Form.Button>
          <Form.Button inverted color="red" onClick={() => setOpen(false)}>
            Cancel
          </Form.Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default CompetitionPlainForm
