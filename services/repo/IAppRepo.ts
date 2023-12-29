export default interface IAppRepo {
  createUserIdea(userId: string, idea: string): Promise<{ error?: string[], idea?: Idea }>
  getUserIdeas(userId: string) : Promise<Partial<Idea>[]>
  updateIdeaProperties(ideaId: string, properties: Partial<{ description: string, problem: string }>) : Promise<void>
}


export type Idea = {
  id: string
  name: string
  description: string
  problem: string
}