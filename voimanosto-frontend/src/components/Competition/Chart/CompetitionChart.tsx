import React from 'react'
import {
  ResponsiveContainer,
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Line
} from 'recharts'
import moment from 'moment'

interface CompetitionChartProps {
  data: ICompetition[]
}

const CompetitionChart: React.FC<CompetitionChartProps> = ({ data }) => {
  const results = data.map(row => ({
    ...row.result,
    bodyweight: row.bodyweight,
    date: row.date
  }))

  const formatTooltip = (data: any): React.ReactElement | null => {
    if (data.active) {
      const value = data.payload[0].payload
      return (
        <div className='custom-tooltip' style={{ backgroundColor: 'white' }}>
          <p className='label'>{`Date : ${moment(value.date).format(
            'MMM DD, YY'
          )}`}</p>
          <p style={{ color: data.payload[0].color }}>{`Squat: ${
            value.squat
          } kg`}</p>
          <p style={{ color: data.payload[1].color }}>{`Bench: ${
            value.bench
          } kg`}</p>
          <p style={{ color: data.payload[2].color }}>{`Deadlift: ${
            value.deadlift
          } kg`}</p>
          <p>{`Bodyweight: ${value.bodyweight} kg`}</p>
          <p style={{ color: data.payload[3].color }}>{`IPF Points: ${
            value.ipf
          }`}</p>
          <p style={{ color: data.payload[3].color }}>{`Wilks: ${
            value.wilks
          } points`}</p>
        </div>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer height={500} width='100%'>
      <ComposedChart data={results}>
        <CartesianGrid stroke='#f5f5f5' opacity={0.3} />
        <XAxis
          dataKey='date'
          tickFormatter={tick => moment(tick).format('MMM DD, YY')}
          label={{
            value: 'Competition',
            position: 'insideBottomRight',
            offset: 0,
            fill: 'white'
          }}
          stroke='white'
        />
        <YAxis
          yAxisId='left'
          label={{
            value: 'Total',
            angle: -90,
            position: 'insideLeft',
            fill: 'white'
          }}
          stroke='white'
          type='number'
          domain={[0, 700]}
        />
        <YAxis
          yAxisId='right'
          orientation='right'
          label={{
            value: 'IPF Points',
            angle: -90,
            position: 'insideRight',
            fill: 'white'
          }}
          stroke='white'
          type='number'
          domain={[300, 800]}
        />
        <Tooltip content={formatTooltip} />
        <Legend
          formatter={(value, entry) => (
            <span style={{ color: 'white' }}>{value.toUpperCase()}</span>
          )}
        />

        <Bar
          yAxisId='left'
          dataKey='squat'
          barSize={20}
          fill='#413ea0'
          stackId='a'
        />
        <Bar
          yAxisId='left'
          dataKey='bench'
          barSize={20}
          fill='#82ca9d'
          stackId='a'
        />
        <Bar
          yAxisId='left'
          dataKey='deadlift'
          barSize={20}
          fill='#ffc658'
          stackId='a'
        />
        <Line yAxisId='right' type='linear' dataKey='ipf' stroke='#ff7300' />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

export default CompetitionChart
