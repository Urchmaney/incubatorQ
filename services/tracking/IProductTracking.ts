export default interface IProductTracking {

  identifyAsLoggedInUser(userId: string): void

  trackJourneyPageViewed(): void
  trackUseIdeaClicked(journeyId: string): void
  trackCommentJourney(journeyId: string): void
  trackAddNewJourney(): void
  trackCreateNewJourney(): void

  trackLoginPageView(): void
  trackLoginClicked(): void
  trackRegisterPageView(): void
  trackRegisterClicked(): void

  trackAddIdeaClicked(): void
  trackCreateNewIdeaClicked(): void
}

export const TrackingEvent = {
  JOURNEY_PAGE_VIEWED: 'journey/page_viewed',
  JOURNEY_USE_FOR_IDEA_CLICKED: 'journey/use_for_idea_clicked',
  JOURNEY_COMMENT_CLICKED: 'journey/comment_clicked',
  JOURNEY_ADD_NEW_CLICKED: 'journey/add_new_clicked',
  JOURNEY_CREATE_NEW_CLICKED: 'journey/create_new_clicked',

  AUTH_LOGIN_PAGE_VIEWED: 'auth/login_page_viewed',
  AUTH_LOGIN_CLICKED: 'auth/login_clicked',
  AUTH_REGISTER_PAGE_VIEWED: 'auth/register_page_viewed',
  AUTH_REGISTER_CLICKED: 'auth/register_clicked',

  IDEA_ADD_CLICKED: 'idea/add_clicked',
  IDEA_CREATE_NEW_CLICKED: 'idea/create_new_clicked'
}