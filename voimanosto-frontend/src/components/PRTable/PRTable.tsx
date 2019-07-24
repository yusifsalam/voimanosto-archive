import React, { useContext, useState, useEffect } from 'react'
import { Header, Tab } from 'semantic-ui-react'
import { UserContext } from '../../context/userContext'
import prService from '../../services/prService'
import TableByName from './TableByName'
import TableByType from './TableByType'
import LoadingLottie from '../../animations/LoadingLottie'

const PRTable: React.FC = () => {
  const { user } = useContext(UserContext)
  const [data, setData] = useState<IPR[]>([])
  const [type, setType] = useState('')
  const [name, setName] = useState('')
  const [dataLoaded, setDataLoaded] = useState(false)

  const tabIndices = {
    0: '',
    1: 'Squat',
    2: 'Bench',
    3: 'Deadlift',
    4: 'acc'
  }

  useEffect(() => {
    const fetchData = async () => {
      setDataLoaded(false)
      const res = await prService.getAll({
        username: user.username,
        token: user.token,
        type: type,
        name: name,
        current: 'current'
      })
      setData(res)
      setDataLoaded(true)
    }
    fetchData()
  }, [user, type, name])

  const handleTabChange = (e: any, data: any) => {
    const i = data.activeIndex
    let newType = '',
      newName = ''
    switch (i) {
      case 0:
        newType = ''
        newName = ''
        break
      case 1:
        newType = 'sbd'
        newName = tabIndices[1]
        break
      case 2:
        newType = 'sbd'
        newName = tabIndices[2]
        break
      case 3:
        newType = 'sbd'
        newName = tabIndices[3]
        break
      case 4:
        newType = 'sbd'
        newName = ''
        break
      case 5:
        newType = 'acc'
        newName = ''
        break
    }
    setType(newType)
    setName(newName)
  }
  return (
    <div>
      <Header inverted as='h1'>
        PERSONAL RECORD TABLE
      </Header>
      <Tab
        menu={{ color: 'grey', inverted: true, compact: true, pointing: true }}
        defaultActiveIndex={0}
        className='inverted'
        panes={[
          { menuItem: 'All' },
          { menuItem: 'Squat' },
          { menuItem: 'Bench' },
          { menuItem: 'Deadlift' },
          { menuItem: 'SBD' },
          { menuItem: 'Accessories' }
        ]}
        onTabChange={handleTabChange}
      >
        <Tab.Pane>SBD</Tab.Pane>
        <Tab.Pane>Accessories</Tab.Pane>
      </Tab>
      {dataLoaded ? (
        name === '' ? (
          <TableByType data={data} />
        ) : (
          <TableByName data={data} />
        )
      ) : (
        <LoadingLottie />
      )}
    </div>
  )
}

export default PRTable
