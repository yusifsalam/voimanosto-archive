import React, { useState } from 'react'
import Calendar from 'react-calendar'
import {
  TransitionablePortal,
  Button,
  Form,
  Segment,
  Message
} from 'semantic-ui-react'
import './CustomCalendar.scss'
import bodyweightService from '../../services/bodyweightService'
import moment from 'moment'
import { IUser } from '../../types'

interface CalendarProps {
  user: IUser | null | undefined
}

const CustomCalendar: React.FC<CalendarProps> = ({ user }) => {
  const [portalOpen, setPortalOpen] = useState(false)
  const [subPortalOpen, setSubPortalOpen] = useState(false)
  const [popupTopPos, setPopupTopPos] = useState(0)
  const [popupLeftPos, setPopupLeftPos] = useState(0)
  const [selectedDay, setSelectedDay] = useState('')
  const [bodyweight, setBodyweight] = useState(0)
  const [msg, setMsg] = useState<null | string>(null)

  const handleClick = (event: any) => {
    setPortalOpen(true)
    setSelectedDay(event)
    const btnEl = document.getElementsByClassName(
      'react-calendar__tile--active'
    )
    let btn = btnEl.item(0)
    const calEl = document.getElementsByClassName(
      'react-calendar__month-view__days'
    )
    let monthBox = calEl.item(0)
    if (btn && monthBox) {
      let btnPos = btn.getBoundingClientRect()
      let boxPos = monthBox.getBoundingClientRect()
      if (btnPos.top + 200 > boxPos.bottom) setPopupTopPos(boxPos.bottom - 200)
      else setPopupTopPos(btnPos.top + 15 + btnPos.height / 2)
      if (btnPos.left + 150 > boxPos.right) setPopupLeftPos(boxPos.right - 150)
      else setPopupLeftPos(btnPos.left)
    }
  }

  const addBodyweight = async () => {
    const dateObj = moment(selectedDay).toDate()
    if (user) {
      const result = await bodyweightService.addBw({
        date: dateObj,
        bodyweight: bodyweight,
        username: user.username,
        token: user.token
      })
      setMsg(
        `Successfully added new bodyweight (${
          result.bodyweight
        } kg) to ${moment(result.date).format('MMMM Do, YYYY')}`
      )
      setTimeout(() => {
        setMsg(null)
      }, 3000)
      setSubPortalOpen(false)
    }
  }

  return (
    <div>
      <Message
        header='Sucess'
        content={msg}
        hidden={msg ? false : true}
        success
      />

      <Calendar onChange={handleClick} className='react-calendar' />
      <TransitionablePortal
        onClose={() => setPortalOpen(false)}
        open={portalOpen}
      >
        <Button.Group
          style={{
            left: `${popupLeftPos}px`,
            position: 'fixed',
            top: `${popupTopPos}px`,
            maxWidth: '150px',
            maxHeight: '200px',
            zIndex: 1000,
            backgroundColor: 'white',
            border: '3px solid rgba(255,0,0,0.5)'
          }}
          vertical
          size='small'
        >
          <Button
            size='mini'
            color='youtube'
            style={{ border: '2px white solid' }}
            onClick={() => {
              setPortalOpen(false)
              setSubPortalOpen(true)
            }}
          >
            Log bodyweight
          </Button>

          <Button
            size='mini'
            color='youtube'
            style={{ border: '2px white solid' }}
          >
            New workouts
          </Button>

          <Button
            size='mini'
            color='youtube'
            style={{ border: '2px white solid' }}
          >
            New competition
          </Button>

          <div />
        </Button.Group>
      </TransitionablePortal>
      <TransitionablePortal
        open={subPortalOpen}
        onClose={() => setSubPortalOpen(false)}
      >
        <Segment
          style={{ left: '40%', position: 'fixed', top: '50%', zIndex: 1000 }}
        >
          <Form onSubmit={addBodyweight}>
            <Form.Input
              placeholder='bodyweight'
              type='number'
              step='0.01'
              min='0'
              onChange={({ target }) => setBodyweight(Number(target.value))}
            />
            <Button type='submit'>Add bodyiweght</Button>
          </Form>
          <Button onClick={() => setSubPortalOpen(false)}>Cancel</Button>
        </Segment>
      </TransitionablePortal>
    </div>
  )
}

export default CustomCalendar
