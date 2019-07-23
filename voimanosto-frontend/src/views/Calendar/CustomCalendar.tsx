import React, { useState, useEffect, useContext } from 'react'
import Calendar from 'react-calendar'
import {
  TransitionablePortal,
  Button,
  Message,
  Container,
  Header
} from 'semantic-ui-react'
import './CustomCalendar.scss'
import bodyweightService from '../../services/bodyweightService'
import moment from 'moment'
import { UserContext } from '../../context/userContext'
import BodyweightForm from '../../components/Bodyweight/Form'

const CustomCalendar: React.FC = () => {
  const [portalOpen, setPortalOpen] = useState(false)
  const [subPortalOpen, setSubPortalOpen] = useState(false)
  const [popupTopPos, setPopupTopPos] = useState(0)
  const [popupLeftPos, setPopupLeftPos] = useState(0)
  const [selectedDay, setSelectedDay] = useState('')
  const [bodyweight, setBodyweight] = useState(0)
  const [msg, setMsg] = useState<null | string>(null)
  const { user } = useContext(UserContext)

  useEffect(() => {
    let icon = document.createElement('i')
    icon.classList.add('icon', 'trophy')
    const test = document
      .getElementsByClassName('react-calendar__tile--now')
      .item(0)

    if (test) {
      let nodes = Array.from(test.childNodes)
      if (nodes.length < 2) {
        test.appendChild(icon)
      }
    }
  })

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
    <Container fluid>
      <Message
        header='Sucess'
        content={msg}
        hidden={msg ? false : true}
        success
      />

      <Calendar
        minDetail='year'
        onChange={handleClick}
        className='react-calendar'
      />
      <TransitionablePortal
        onClose={() => setPortalOpen(false)}
        open={portalOpen}
      >
        <Button.Group
          style={{
            left: `${popupLeftPos}px`,
            position: 'fixed',
            top: `${popupTopPos}px`,
            maxWidth: '155px',
            maxHeight: '200px',
            zIndex: 1000,
            backgroundColor: 'black'
            // border: '3px solid rgba(255,0,0,0.5)'
          }}
          vertical
          size='small'
          inverted
          color='red'
        >
          <Button
            size='mini'
            style={{ border: '2px white solid' }}
            onClick={() => {
              setPortalOpen(false)
              setSubPortalOpen(true)
            }}
          >
            Log bodyweight
          </Button>

          <Button size='mini' style={{ border: '2px white solid' }}>
            New workouts
          </Button>

          <Button size='mini' style={{ border: '2px white solid' }}>
            New competition
          </Button>

          <div />
        </Button.Group>
      </TransitionablePortal>
      <BodyweightForm
        addBodyweight={addBodyweight}
        setBodyweight={setBodyweight}
        open={subPortalOpen}
        setOpen={setSubPortalOpen}
        btnText='Add'
      />
      <Header inverted as='h4'>
        {selectedDay !== ''
          ? moment(selectedDay).format('MMMM D, YYYY') + ' selected'
          : null}{' '}
      </Header>
    </Container>
  )
}

export default CustomCalendar
