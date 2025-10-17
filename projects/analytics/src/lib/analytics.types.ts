// analytics.types.ts

/**
 * Callbacks for tracking event notifications.
 * Used to notify the caller about the success or failure of sending tracking data.
 */
export interface TrackingCallbacks {
  /**
   * Called when the tracking event is sent successfully.
   */
  onSuccess?: () => void;
  /**
   * Called when sending the tracking event fails.
   * @param error The error object or message.
   */
  onFailure?: (error: any) => void;
}

/**
 * Data structure for tracking events.
 */
export interface TrackingData {
  /**
   * Unique identifier for the tracking event.
   */
  id: string;
  /**
   * Optional additional data to be sent with the event.
   */
  data?: Record<string, any>;
  /**
   * Optional callbacks to notify about success or failure of sending the event.
   */
  notify?: TrackingCallbacks;
}

/**
 * User data included in analytics events.
 */
export interface AnalyticsUserData {
  /**
   * Unique user identifier.
   */
  userId: string;
  /**
   * Unique account identifier.
   */
  accountId: string;
  // Additional user information can be added here.
}

/**
 * Complete payload interface sent to the analytics backend.
 */
export interface Analytics {
  /**
   * The current page URL.
   */
  url: string;
  /**
   * The destination URL, if applicable.
   */
  urlTo: string;
  /**
   * The type of event (currently only 'click').
   */
  type: 'click';
  /**
   * CSS classes of the element.
   */
  cssClasses: string;
  /**
   * HTML id attribute of the element.
   */
  htmlId: string;
  /**
   * HTML tag name of the element.
   */
  htmlTag: string;
  /**
   * Text content of the element, if any.
   */
  htmlText: string | null;
  /**
   * Href attribute if the element is a link, otherwise null.
   */
  linkHref: string | null;
  /**
   * Src attribute if the element is an image, otherwise null.
   */
  imgSrc: string | null;
  /**
   * Alt attribute if the element is an image, otherwise null.
   */
  imgAlt: string | null;
  /**
   * Tracking identifier, if available.
   */
  trackingId: string | null;
  /**
   * Additional object data, serialized as a string, if any.
   */
  objectData: string | null;
  /**
   * User data associated with the event.
   */
  userData: AnalyticsUserData;
}
