/// <reference types="react-scripts" />

type IUser = {
  name: string
  username: string
  avatar: string
  email: string
  token: string
  loggedIn: boolean
}

interface IBodyweight {
  date: Date
  bodyweight: number
  id: string
}
interface IBodyweightProps {
  data: IBodyweight[]
}

interface IBodyweightTableProps {
  data: IBodyweight[]
  setData: (data: IBodyweight[]) => void
}

interface IExercise {
  type: string
  name: string
  variation: string
  prs: IPR[]
  id?: string
}

interface IExerciseInstance {
  exercise: IExercise
  reps: number
  sets: number
  weight: number
  intensity: number
  RPE: number
  isPR: boolean
  id: string
}

interface IPR {
  date: Date
  reps: number
  weight: number
  exercise: IExercise
  _id?: string
}

interface ICompetitionResult {
  squat: number
  bench: number
  deadlfit: number
  ipf: number
  wilks: number
}

interface ICompetition {
  date: Date
  type: string
  name: string
  venue: string
  result: ICompetitionResult
  bodyweight: number
}

interface IWorkout {
  date: Date
  exercises: IExerciseInstance[]
  notes: string
  readiness: number
}
