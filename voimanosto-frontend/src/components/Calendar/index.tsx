import React, { useState } from 'react'
import Calendar from 'react-calendar'
import { TransitionablePortal, Button, Form } from 'semantic-ui-react'
import './CustomCalendar.scss'
import bodyweightService from '../../services/bodyweightService'
import moment from 'moment'
import { IUser } from '../../types'

interface CalendarProps {
  user: IUser | null | undefined
}

const CustomCalendar: React.FC<CalendarProps> = ({ user }) => {
  const [portalOpen, setPortalOpen] = useState(false)
  const [popupTopPos, setPopupTopPos] = useState(0)
  const [popupLeftPos, setPopupLeftPos] = useState(0)
  const [selectedDay, setSelectedDay] = useState('')
  const [bodyweight, setBodyweight] = useState(0)

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
      console.log(result)
    }
  }

  return (
    <div>
      <h1>Calendar y'all</h1>
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
            backgroundColor: 'white'
          }}
          vertical
          size='small'
        >
          <Button
            size='mini'
            color='youtube'
            style={{ border: '2px white solid' }}
            onClick={() => addBodyweight()}
          >
            Add new bodyweight reading
          </Button>

          <Button
            size='mini'
            color='youtube'
            style={{ border: '2px white solid' }}
          >
            Add new workout
          </Button>

          <Button
            size='mini'
            color='youtube'
            style={{ border: '2px white solid' }}
          >
            Add new competition
          </Button>

          <div />
        </Button.Group>
      </TransitionablePortal>
      <Form>
        <Form.Input
          type='number'
          onChange={({ target }) => setBodyweight(Number(target.value))}
        />
      </Form>
    </div>
  )
}

export default CustomCalendar
