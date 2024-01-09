import mixpanel, { Mixpanel } from "mixpanel-browser";
import IProductTracking, { TrackingEvent } from "../IProductTracking";

export class MixpanelTracker implements IProductTracking {
  private static _instance: MixpanelTracker

  public static getInstance(): MixpanelTracker {
    if (!MixpanelTracker._instance) {
      return (MixpanelTracker._instance = new MixpanelTracker())
    }

    return this._instance
  }

  constructor() {
    if (MixpanelTracker._instance) {
      throw new Error("Multiple initializing Tracker...")
    }

    mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_ID || "", {
      debug: ((process.env.NEXT_PUBLIC_ENV || "dev") === "dev"),
      track_pageview: true,
      persistence: "localStorage"
    });
    mixpanel.identify()
  }

  private trackObject(event: string, data: object = {}) {
    mixpanel.track(event, data)
  }

  identifyAsLoggedInUser(userId: string) {
    mixpanel.identify(userId);
  }


  trackJourneyPageViewed(): void {
    this.trackObject(TrackingEvent.JOURNEY_PAGE_VIEWED)
  }
  trackUseIdeaClicked(journeyId: string): void {
    this.trackObject(TrackingEvent.JOURNEY_USE_FOR_IDEA_CLICKED, { journeyId })
  }
  trackCommentJourney(journeyId: string): void {
    this.trackObject(TrackingEvent.JOURNEY_COMMENT_CLICKED, { journeyId })
  }
  trackAddNewJourney(): void {
    this.trackObject(TrackingEvent.JOURNEY_ADD_NEW_CLICKED)
  }
  trackCreateNewJourney(): void {
    this.trackObject(TrackingEvent.JOURNEY_CREATE_NEW_CLICKED)
  }
  trackLoginPageView(): void {
    this.trackObject(TrackingEvent.AUTH_LOGIN_PAGE_VIEWED)
  }
  trackLoginClicked(): void {
    this.trackObject(TrackingEvent.AUTH_LOGIN_CLICKED)
  }
  trackRegisterPageView(): void {
    this.trackObject(TrackingEvent.AUTH_REGISTER_PAGE_VIEWED)
  }
  trackRegisterClicked(): void {
    this.trackObject(TrackingEvent.AUTH_REGISTER_CLICKED)
  }
  trackAddIdeaClicked(): void {
    this.trackObject(TrackingEvent.IDEA_ADD_CLICKED)
  }
  trackCreateNewIdeaClicked(): void {
    this.trackObject(TrackingEvent.IDEA_CREATE_NEW_CLICKED)
  }

}