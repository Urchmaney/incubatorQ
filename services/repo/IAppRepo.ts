export default interface IAppRepo {
  createUserIdea(userId: string, idea: string, email: string): Promise<{ error?: string[], idea?: Idea }>
  getUserIdeas(userId: string) : Promise<Partial<Idea>[]>
  updateIdeaProperties(ideaId: string, properties: Partial<{ description: string, problem: string }>) : Promise<void>
  addIdeaLearning(ideaId: string, learning: string): Promise<void>
  getIdeaLearnings(ideaId: string): Promise<Learning[]>

  addIdeaAssumption(ideaId: string, learning: string): Promise<Partial<{ id: string, error: string }>>
  getIdeaAssumptions(ideaId: string): Promise<Assumption[]>

  createUserJourney(userId: string, journey: Partial<Journey>): Promise<Partial<{ journeyId: string, error: string }>>
  updateUserJourney(userId: string, journeyId: string, journey: Partial<Journey>): Promise<Partial<{ journeyId: string, error: string }>>
  getJourneys(): Promise<Journey[]>
}

export type Journey = {
  id: string
  userId: string
  pmfDescription: string
  steps: Step[]
}

export type Step = {
    name: string,
    description: string
}

export type IdeaStep = Step & {
    status: "done" | "ongoing" | "initial"
}

export type Idea = {
  id: string
  name: string
  description: string
  problem: string
  steps?: IdeaStep[]
  membersIds: string[]
  members: Member[]
}

export type Member = {
    id: string
    owner: boolean
    email: string
}

export type Learning = {
  id: string
  content: string
}

export type Assumption = {
  id: string
  content: string
}