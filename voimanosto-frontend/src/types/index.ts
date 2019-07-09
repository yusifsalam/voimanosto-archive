export type IUser = {
  name: string
  username: string
}

export interface ILoginProps {
  username: string
  password: string
  errorMessage?: string | null
  handleLogin(event: React.FormEvent<HTMLFormElement>): void
  setUsername(username: string): void
  setPassword(password: string): void
}
