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

interface CompetitionChartProps {
  data: ICompetition[]
}

const CompetitionChart: React.FC<CompetitionChartProps> = ({ data }) => {
  const data2 = [
    {
      comp: 'May 2017',
      squat: 175,
      bench: 135,
      deadlift: 225,
      wilks: 378
    },
    {
      comp: 'December 2017',
      squat: 182.5,
      bench: 132.5,
      deadlift: 232.5,
      wilks: 392
    },
    {
      comp: 'April 2018',
      squat: 185,
      bench: 132.5,
      deadlift: 245,
      wilks: 410
    },
    {
      comp: 'May 2019',
      squat: 190,
      bench: 150,
      deadlift: 260,
      wilks: 422
    }
  ]
  return (
    <ResponsiveContainer height={500} width='100%'>
      <ComposedChart data={data2}>
        <CartesianGrid stroke='#f5f5f5' opacity={0.3} />
        <XAxis
          dataKey='comp'
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
          domain={[0, 650]}
        />
        <YAxis
          yAxisId='right'
          orientation='right'
          label={{
            value: 'Wilks',
            angle: -90,
            position: 'insideRight',
            fill: 'white'
          }}
          stroke='white'
          type='number'
          domain={[350, 450]}
        />
        <Tooltip />
        <Legend
          formatter={(value, entry) => (
            <span style={{ color: 'white' }}>{value}</span>
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
        <Line
          yAxisId='right'
          type='monotone'
          dataKey='wilks'
          stroke='#ff7300'
        />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

export default CompetitionChart
