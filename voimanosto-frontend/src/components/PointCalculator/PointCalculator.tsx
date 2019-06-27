import React, { useState } from 'react';
import logo from './new_logo.svg';
import { ipf_params, wilks_params } from '../../util'
import { Button, Container, RadioGroup, TextField, FormControl, FormLabel, FormControlLabel, Radio } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'
import './PointCalculator.css'

const PointCalculator: React.FC = () => {
  const [points, setPoints] = useState(0)
  const [wilks, setWilks] = useState(0)
  const [total, setTotal] = useState(0)
  const [bodyweight, setBodyweight] = useState(0)
  const [sex, setSex] = useState('M')
  const [equipment, setEquipment] = useState('Raw')
  const [eventType, setEventType] = useState('SBD')

  const useStyles = makeStyles({
    root: {
      padding: '10px 10px 15px 10px',
    }
  })

  const handleBodyweightChange = (event: any) => {
    event.preventDefault()
    setBodyweight(event.target.value)
  }

  const handleTotalChange = (event: any) => {
    event.preventDefault()
    setTotal(event.target.value)
  }

  const handleSexChange = (event: React.ChangeEvent<unknown>) => {
    setSex((event.target as HTMLInputElement).value)
  }

  const handleEquipmentChange = (event: any) => {
    setEquipment(event.target.value)
  }

  const handleEventChange = (event: any) => {
    setEventType(event.target.value)
  }

  const handlePointChange = (event: any) => {
    event.preventDefault()
    setPoints(calculatePoints(total, bodyweight, sex, equipment, eventType))
    setWilks(calculateWilks(total, bodyweight, sex))
  }

  function calculatePoints(total: number, bw: number, sex: string, equipment: string, eventType: string, ): number {
    if (bodyweight === 0) alert('Please enter bodyweight')
    if (total === 0) alert('Please enter total')
    let constants = ipf_params[sex][equipment][eventType]
    let points = 500 + 100 * (total - (constants[0] * Math.log(bw) - constants[1])) / (constants[2] * Math.log(bw) - constants[3])
    return Math.round(points * 100) / 100
  }

  function calculateWilks(total: number, bw: number, sex: string): number {
    let constants = wilks_params[sex]
    let wilks = total * 500 / (constants[0] + constants[1] * bw + constants[2] * Math.pow(bw, 2) + constants[3] * Math.pow(bw, 3)
      + constants[4] * Math.pow(bw, 4) + constants[5] * Math.pow(bw, 5))
    return Math.round(wilks * 100) / 100
  }

  const classes = useStyles()
  
  return (
    <Container maxWidth="sm">
      <div>
        <img src={logo} className="App-logo" alt="logo" />
        <p>IPF points {points}</p>
        <p>Wilks points {wilks} </p>
        <form onSubmit={handleBodyweightChange}>
          <TextField value={bodyweight === 0 ? '' : bodyweight} onChange={handleBodyweightChange} placeholder='Bodyweight' type='number' />
          <TextField value={total === 0 ? '' : total} onChange={handleTotalChange} placeholder='Total' type='number' />

        </form>
        <div className={classes.root}>
          <FormControl component='fieldset'>
            <FormLabel component='legend'>Sex</FormLabel>
            <RadioGroup row onChange={handleSexChange} className={classes.root} value={sex}>
              <FormControlLabel value='M' control={<Radio />} label='Male' />
              <FormControlLabel value='F' control={<Radio />} label='Female' />
            </RadioGroup>
          </FormControl>

          <FormControl component='fieldset'>
            <FormLabel component='legend'>Event type</FormLabel>
            <RadioGroup row onChange={handleEventChange} className={classes.root} value={eventType}>
              <FormControlLabel value='SBD' control={<Radio />} label='Full competition' />
              <FormControlLabel value='S' control={<Radio />} label='Squat' />
              <FormControlLabel value='B' control={<Radio />} label='Bench' />
              <FormControlLabel value='D' control={<Radio />} label='Deadlift' />

            </RadioGroup>
          </FormControl>

          <FormControl component='fieldset'>
            <FormLabel component='legend'>Equipment</FormLabel>
            <RadioGroup row onChange={handleEquipmentChange} className={classes.root} value={equipment}>
              <FormControlLabel value='Raw' control={<Radio />} label='Raw' />
              <FormControlLabel value='Single-Ply' control={<Radio />} label='Single-Ply' />
            </RadioGroup>
          </FormControl>

        </div>

      </div>
      <Button type='submit' variant='contained' color='primary' onClick={handlePointChange}>Calculate</Button>
    </Container>
  );
}

export default PointCalculator;
