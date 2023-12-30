export default interface IAppRepo {
  createUserIdea(userId: string, idea: string): Promise<{ error?: string[], idea?: Idea }>
  getUserIdeas(userId: string) : Promise<Partial<Idea>[]>
  updateIdeaProperties(ideaId: string, properties: Partial<{ description: string, problem: string }>) : Promise<void>
  addIdeaLearning(ideaId: string, learning: string): Promise<void>
  getIdeaLearnings(ideaId: string): Promise<Learning[]>
}


export type Idea = {
  id: string
  name: string
  description: string
  problem: string
}

export type Learning = {
  id: string
  content: string
}