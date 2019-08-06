import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react'
import Calendar, { CalendarTileProperties } from 'react-calendar'
import {
  Button,
  Container,
  Header,
  Message,
  TransitionablePortal
} from 'semantic-ui-react'
import BodyweightForm from '../../components/Bodyweight/Form'
import CompetitionForm from '../../components/Competition/Form'
import WorkoutForm from '../../components/Workouts/Form'
import { UserContext } from '../../context/userContext'
import bodyweightService from '../../services/bodyweightService'
import competitionService from '../../services/competitionService'
import workoutService from '../../services/workoutService'
import './CustomCalendar.scss'

const CustomCalendar: React.FC = () => {
  const [portalOpen, setPortalOpen] = useState(false)
  const [bwPortalOpen, setBwPortalOpen] = useState(false)
  const [workoutPortalOpen, setWorkoutPortalOpen] = useState(false)
  const [compPortalOpen, setCompPortalOpen] = useState(false)
  const [popupTopPos, setPopupTopPos] = useState(0)
  const [popupLeftPos, setPopupLeftPos] = useState(0)
  const [selectedDay, setSelectedDay] = useState(moment().toDate())
  const [startOfMonth, setStartOfMonth] = useState(
    moment()
      .startOf('month')
      .toDate()
  )
  const [workouts, setWorkouts] = useState<number[]>([])
  const [bodyweights, setBodyweights] = useState<number[]>([])
  const [competitions, setCompetitions] = useState<number[]>([])
  const [bodyweight, setBodyweight] = useState(0)
  const [msg, setMsg] = useState<null | string>(null)
  const { user } = useContext(UserContext)

  useEffect(() => {
    const fetchData = async () => {
      const props = {
        username: user.username,
        token: user.token,
        date: startOfMonth
      }
      const workouts = await workoutService.getMonth(props)
      setWorkouts(
        workouts.map((entry: any) =>
          moment(entry.date)
            .startOf('day')
            .toDate()
            .getTime()
        )
      )
      const bws = await bodyweightService.getMonth(props)

      setBodyweights(
        bws.map((bw: any) =>
          moment(bw.date)
            .startOf('day')
            .toDate()
            .getTime()
        )
      )
      const comps = await competitionService.getMonth(props)
      setCompetitions(
        comps.map((comp: any) =>
          moment(comp.date)
            .startOf('day')
            .toDate()
            .getTime()
        )
      )
    }
    fetchData()
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
  }, [user, startOfMonth])

  const handleClick = (event: any) => {
    setPortalOpen(true)
    setSelectedDay(event)
    let monthStart = moment(event)
      .startOf('month')
      .toDate()
    if (monthStart.getTime() !== startOfMonth.getTime()) {
      setStartOfMonth(monthStart)
    }
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

  const drawWorkoutIcons = (
    props: CalendarTileProperties
  ): React.ReactElement => {
    const { date } = props
    let arr = []
    if (workouts.includes(date.getTime())) {
      arr.push(
        <i
          className='ui icon dumbbell large green'
          key={date.getTime() + 'workout'}
        />
      )
    }
    if (bodyweights.includes(date.getTime())) {
      arr.push(
        <i className='ui icon weight large blue' key={date.getTime() + 'bw'} />
      )
    }
    if (competitions.includes(date.getTime())) {
      arr.push(
        <i
          className='ui icon trophy large yellow'
          key={date.getTime() + 'comp'}
        />
      )
    }
    return <div>{arr}</div>
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
      setBwPortalOpen(false)
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
        tileContent={drawWorkoutIcons}
        onActiveDateChange={({ activeStartDate }) =>
          setStartOfMonth(activeStartDate)
        }
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
              setBwPortalOpen(true)
            }}
          >
            Log bodyweight
          </Button>

          <Button
            size='mini'
            style={{ border: '2px white solid' }}
            onClick={() => {
              setPortalOpen(false)
              setWorkoutPortalOpen(true)
            }}
          >
            New workout
          </Button>

          <Button
            size='mini'
            style={{ border: '2px white solid' }}
            onClick={() => {
              setPortalOpen(false)
              setCompPortalOpen(true)
            }}
          >
            New competition
          </Button>

          <div />
        </Button.Group>
      </TransitionablePortal>
      <BodyweightForm
        addBodyweight={addBodyweight}
        setBodyweight={setBodyweight}
        open={bwPortalOpen}
        setOpen={setBwPortalOpen}
        btnText='Add'
      />
      <CompetitionForm
        open={compPortalOpen}
        setOpen={setCompPortalOpen}
        date={moment(selectedDay).toDate()}
      />
      <WorkoutForm
        setOpen={setWorkoutPortalOpen}
        open={workoutPortalOpen}
        date={moment(selectedDay).toDate()}
      />
      <Header inverted as='h4'>
        {moment(selectedDay).format('MMMM D, YYYY') + ' selected'}
      </Header>
    </Container>
  )
}

export default CustomCalendar
