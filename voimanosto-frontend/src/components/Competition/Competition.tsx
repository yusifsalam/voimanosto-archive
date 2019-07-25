import React, { useEffect, useContext, useState } from 'react'
import { UserContext } from '../../context/userContext'
import competitionService from '../../services/competitionService'
import LoadingLottie from '../../animations/LoadingLottie'
import CompetitionChart from './Chart'
import CompetitionForm from './Form/'

const Competition: React.FC = () => {
  const [data, setData] = useState<ICompetition[]>([])
  const [dataLoaded, setDataLoaded] = useState(false)
  const [open, setOpen] = useState(false)
  const { user } = useContext(UserContext)
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        setDataLoaded(false)
        const res = await competitionService.getCompsByType({
          username: user.username,
          token: user.token,
          type: 'Powerlifting'
        })
        setData(res)
        setDataLoaded(true)
      }
    }
    fetchData()
  }, [user])
  return (
    <div>
      {dataLoaded ? <CompetitionChart data={data} /> : <LoadingLottie />}
      <button onClick={() => setOpen(!open)}>open portal</button>
      <CompetitionForm open={open} setOpen={setOpen} date={new Date()} />
    </div>
  )
}

export default Competition
