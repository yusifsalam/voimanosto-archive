import React from 'react'
import Calendar, { MonthView } from 'react-calendar'

const CustomCalendar: React.FC = () => {
  return (
    <div>
      <h1>Calendar y'all</h1>
      <Calendar />
      <h1>Month view</h1>
      <MonthView activeStartDate={new Date(2019, 6, 1)} />
    </div>
  )
}

export default CustomCalendar
