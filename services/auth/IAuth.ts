export default interface IAuth {
  register(email: string, password: string, fullName: string) : Promise<string[]>
  login(email: string, password: string) : Promise<string[]>
  user: AppUser
}

export type AppUser = {
  displayName: string
}