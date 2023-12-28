export default interface IAuth {
  register(email: string, password: string, fullName: string) : Promise<string[]>
  login(email: string, password: string) : Promise<string[]>
  logout() : Promise<void>
  user: AppUser | null
}

export type AppUser = {
  displayName: string
}