import React from 'react'
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
  Label as ChartLabel
} from 'recharts'
import moment from 'moment'

const BodyweightChart: React.FC<IBodyweightProps> = ({ data }) => {
  return (
    <div style={{ marginTop: 20 }}>
      <ResponsiveContainer height={300} width='100%'>
        <AreaChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 20 }}
        >
          <XAxis
            dataKey='date'
            tickFormatter={tick => moment(tick).format('MMM DD')}
            stroke='white'
          >
            <ChartLabel
              value='Date'
              position='insideBottom'
              offset={-10}
              fill='white'
            />
          </XAxis>
          <YAxis
            stroke='white'
            label={{
              value: 'Bodyweight, kg',
              angle: -90,
              fill: 'white',
              position: 'insideLeft'
            }}
          />
          <Area
            type='monotone'
            dataKey='bodyweight'
            stroke='#8884d8'
            fill='#8884d8'
            fillOpacity={0.7}
          />
          <Tooltip
            labelFormatter={value => 'Date: ' + moment(value).format('MMM DD')}
          />
          <CartesianGrid strokeDasharray='3 3' opacity={0.3} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BodyweightChart
