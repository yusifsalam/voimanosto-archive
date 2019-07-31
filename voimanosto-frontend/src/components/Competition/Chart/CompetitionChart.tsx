import moment from 'moment'
import React from 'react'
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

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
        <div
          className='custom-tooltip'
          style={{
            backgroundColor: 'white',
            borderRadius: '5px',
            opacity: 0.8
          }}
        >
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
          <p style={{ color: '#ff453a' }}>
            Total: {value.squat + value.bench + value.deadlift} kg
          </p>
          <p style={{ color: '#32d74b' }}>{`Bodyweight: ${
            value.bodyweight
          } kg`}</p>
          <p style={{ color: '#bf5af2' }}>{`IPF Points: ${value.ipf}`}</p>
          <p style={{ color: '#bf5af2' }}>{`Wilks: ${value.wilks} points`}</p>
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
        <Tooltip content={data.length > 0 ? formatTooltip : undefined} />
        <Legend
          formatter={(value, entry) => (
            <span style={{ color: 'white' }}>{value.toUpperCase()}</span>
          )}
        />

        <Bar
          yAxisId='left'
          dataKey='squat'
          barSize={20}
          fill='#ff375f'
          stackId='a'
        />
        <Bar
          yAxisId='left'
          dataKey='bench'
          barSize={20}
          fill='#ff9f0a'
          stackId='a'
        />
        <Bar
          yAxisId='left'
          dataKey='deadlift'
          barSize={20}
          fill='#5e5ce6'
          stackId='a'
        />
        <Line yAxisId='right' type='linear' dataKey='ipf' stroke='white' />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

export default CompetitionChart
