export default interface IAppRepo {
  createUserIdea(userId: string, idea: string): Promise<{ error?: string[], idea?: Idea }>
  getUserIdeas(userId: string) : Promise<Partial<Idea>[]>
}


export type Idea = {
  id: string
  name: string
  description: string
}