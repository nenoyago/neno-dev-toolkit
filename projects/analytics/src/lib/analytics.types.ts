export interface Analytics {
  trackingId: string | null;
  objectData?: string | null;
  cssClasses?: string;
  htmlId?: string | null;
  htmlTag?: string;
  htmlText?: string | null;
  imgAlt?: string | null;
  imgSrc?: string | null;
  linkHref?: string | null;
  type?: string;
  url?: string;
  urlTo?: string;
  userData?: AnalyticsUserData;
}

/**
 * @description
 * Represents the data structure for a custom, programmatic tracking event.
 */
export interface TrackingData {
  id: string;
  data?: Record<string, any>;
}

/**
 * @description
 * Defines the required structure for user data to be associated with an analytics event.
 * The consuming application is responsible for mapping its own user model to this structure.
 */
export interface AnalyticsUserData {
  id: string | number;
  nome: string;
  email: string;
  perfisAcesso: any; // Use a more specific type if it's consistent across projects
  espacoSer: boolean; // e.g., string[] or any
}
