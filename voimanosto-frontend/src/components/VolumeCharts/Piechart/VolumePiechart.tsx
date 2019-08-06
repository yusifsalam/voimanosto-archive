import React, { useContext, useEffect, useState } from 'react'
import { Cell, Pie, PieChart, Sector } from 'recharts'
import { Header } from 'semantic-ui-react'
import { UserContext } from '../../../context/userContext'
import metricsService from '../../../services/metricsService'

interface volumeOutput {
  _id: string
  volume: number
  nl: number
  weight: number
}

const COLORS = ['#ff9f0a', '#5e5ce6', '#ff375f']

const VolumePiechart: React.FC = () => {
  const { user } = useContext(UserContext)
  const [data, setData] = useState<volumeOutput[]>([])
  const [activeIndexVol, setActiveIndexVol] = useState(-1)
  const [activeIndexNL, setActiveIndexNL] = useState(-1)

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const res = await metricsService.getAllVolume({
          username: user.username,
          token: user.token
        })
        setData(res)
      }
    }
    fetchData()
  }, [user])

  const renderActiveShape = (props: any, type: string) => {
    const RADIAN = Math.PI / 180
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value
    } = props
    const sin = Math.sin(-RADIAN * midAngle)
    const cos = Math.cos(-RADIAN * midAngle)
    const sx = cx + (outerRadius + 10) * cos
    const sy = cy + (outerRadius + 10) * sin
    const mx = cx + (outerRadius + 30) * cos
    const my = cy + (outerRadius + 30) * sin
    const ex = mx + (cos >= 0 ? 1 : -1) * 22
    const ey = my
    const textAnchor = cos >= 0 ? 'start' : 'end'

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor='middle' fill={fill}>
          {payload._id}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill='none'
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke='none' />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill='white'
        >
          {type === 'vol' ? `Volume ${value} kg` : `NL: ${value}`}
        </text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill='#999'
        >
          {`(${(percent * 100).toFixed(0)}% of total)`}
        </text>
      </g>
    )
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <div style={{ border: '1px solid white' }}>
        <Header inverted content='Volume' style={{ textAlign: 'center' }} />

        <PieChart height={300} width={450}>
          <Pie
            data={data}
            dataKey='volume'
            activeIndex={activeIndexVol}
            activeShape={e => renderActiveShape(e, 'vol')}
            cx={200}
            cy={150}
            innerRadius={60}
            outerRadius={80}
            onMouseEnter={(entry, index) => setActiveIndexVol(index)}
            onTouchStart={(entry, index) => setActiveIndexVol(index)}
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </div>
      <div style={{ border: '1px solid white' }}>
        <Header
          inverted
          content='Number of lifts'
          style={{ textAlign: 'center' }}
        />

        <PieChart height={300} width={450}>
          <Pie
            data={data}
            dataKey='nl'
            activeIndex={activeIndexNL}
            activeShape={e => renderActiveShape(e, 'nl')}
            cx={200}
            cy={150}
            innerRadius={60}
            outerRadius={80}
            onMouseEnter={(entry, index) => setActiveIndexNL(index)}
            onTouchStart={(entry, index) => setActiveIndexNL(index)}
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </div>
    </div>
  )
}

export default VolumePiechart
