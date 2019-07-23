import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../context/userContext'
import { Header, Checkbox, Accordion, Icon } from 'semantic-ui-react'
import bodyweightService from '../../services/bodyweightService'
import LoadingLottie from '../../animations/LoadingLottie'
import BodyweightTable from './Table'
import BodyweightChart from './Chart'

const Bodyweight: React.FC = () => {
  const { user } = useContext(UserContext)
  const [data, setData] = useState<IBodyweight[]>([])
  const [dataLoaded, setDataLoaded] = useState(false)
  const [showTable, setShowTable] = useState(false)
  const [settingsIndex, setSettingsIndex] = useState(-1)
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const res = await bodyweightService.getBw({
          username: user.username,
          token: user.token
        })

        setData(res)
        setDataLoaded(true)
      }
    }
    fetchData()
  }, [user])

  const handleSettingsClick = (
    event: React.SyntheticEvent<HTMLElement>,
    props: any
  ) => {
    const { index } = props
    const newIndex = settingsIndex === index ? -1 : index
    setSettingsIndex(newIndex)
  }

  return (
    <div>
      <Header inverted as='h2'>
        {user.name}'s bodyweight
      </Header>
      <Accordion inverted>
        <Accordion.Title
          active={settingsIndex === 0}
          index={0}
          onClick={handleSettingsClick}
        >
          <Icon inverted name='cog' /> Settings
        </Accordion.Title>
        <Accordion.Content active={settingsIndex === 0}>
          <Checkbox
            toggle
            label='Show table'
            className='inverted'
            checked={showTable}
            onChange={() => setShowTable(!showTable)}
          />
        </Accordion.Content>
      </Accordion>

      {dataLoaded ? (
        <div>
          <BodyweightChart data={data} />
          {showTable ? <BodyweightTable data={data} /> : <div />}
        </div>
      ) : (
        <div>
          <LoadingLottie />
          <Header as='h2' inverted>
            Loading data...
          </Header>
        </div>
      )}
    </div>
  )
}
export default Bodyweight
