import { Injectable, inject } from '@angular/core';

import { TrackingData, AnalyticsUserData, Analytics } from './analytics.types';
import { KibanaHttpService } from './http/kibana-http.service';

/**
 * @description
 * A utility type guard to check if an object is of type `TrackingData`.
 */
function isTrackingObject(arg: Event | TrackingData): arg is TrackingData {
  return (arg as TrackingData).id !== undefined;
}

/**
 * @description
 * Service responsible for tracking user interactions and sending analytics events.
 * It is decoupled from any specific application state and requires user data
 * to be provided for each tracking call.
 */
@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private readonly kibana = inject(KibanaHttpService);

  // --- Public API ---

  /**
   * Tracks a user interaction event based on a DOM Event.
   * It extracts tracking information from `data-tracking-id` and
   * `data-tracking-object` attributes on the event target.
   *
   * @param {Event} event The DOM event to be tracked.
   * @param {AnalyticsUserData} userData The user data to associate with the event.
   */
  public track(event: Event, userData: AnalyticsUserData): void;
  /**
   * Tracks a custom, programmatic event.
   *
   * @param {TrackingData} trackingData An object containing the tracking `id` and optional `data`.
   * @param {AnalyticsUserData} userData The user data to associate with the event.
   * @param {Event} [event] Optional DOM event to enrich the payload with target element details.
   */
  public track(
    trackingData: TrackingData,
    userData: AnalyticsUserData,
    event?: Event
  ): void;
  public track(
    eventOrTrackingData: Event | TrackingData,
    userData: AnalyticsUserData,
    optionalEvent?: Event
  ): void {
    // The consuming application is now responsible for ensuring userData is valid.
    // The library proceeds assuming valid data is passed.
    if (!userData) {
      console.warn(
        'AnalyticsService: User data was not provided. Event will not be tracked.'
      );
      return;
    }

    let trackingId: string | null;
    let objectData: string | null;
    let event: Event | undefined;

    if (isTrackingObject(eventOrTrackingData)) {
      // Called as: track({ id: '...' }, userData, event?)
      event = optionalEvent;
      const target = event?.target as HTMLElement;
      trackingId = eventOrTrackingData.id;
      objectData = eventOrTrackingData.data
        ? JSON.stringify(eventOrTrackingData.data)
        : target?.getAttribute('data-tracking-object') || null;
    } else {
      // Called as: track(event, userData)
      event = eventOrTrackingData;
      const target = event.target as HTMLElement;
      trackingId = target?.getAttribute('data-tracking-id') || null;
      objectData = target?.getAttribute('data-tracking-object') || null;
    }

    const targetElement = event?.target as HTMLElement | undefined;

    if (!this.isTrackable(trackingId, targetElement)) {
      return;
    }

    const basePayload = this.buildBasePayload(userData, targetElement);

    const analyticsPayload: Analytics = {
      ...basePayload,
      trackingId,
      objectData
    };

    this.sendEvent(analyticsPayload);
  }

  // --- Private Helpers ---

  /**
   * @private
   * Determines if an event should be tracked.
   * @param {string | null} trackingId The tracking identifier.
   * @param {HTMLElement | null | undefined} target The HTML element that triggered the event.
   * @returns {boolean} True if the event should be tracked.
   */
  private isTrackable(
    trackingId: string | null,
    target?: HTMLElement | null
  ): boolean {
    const ALLOWED_TAGS = ['IMG', 'BUTTON', 'LABEL', 'INPUT', 'A', 'SPAN'];
    if (trackingId) return true;
    if (!target) return false;

    return ALLOWED_TAGS.includes(target.tagName?.toUpperCase() || '');
  }

  /**
   * @private
   * Constructs the base payload for an analytics event.
   * @param {AnalyticsUserData} user The user data for the event.
   * @param {HTMLElement} [target] The optional target element of the event.
   * @returns {Omit<Analytics, 'trackingId' | 'objectData'>} The base analytics payload.
   */
  private buildBasePayload(
    user: AnalyticsUserData,
    target?: HTMLElement
  ): Omit<Analytics, 'trackingId' | 'objectData'> {
    const url = window.location.href;

    return {
      url,
      urlTo: target?.baseURI ?? url,
      type: 'click',
      cssClasses: target?.classList?.value ?? '',
      htmlId: target?.id ?? '',
      htmlTag: target?.tagName ?? '',
      htmlText: target?.textContent?.trim() ?? null,
      linkHref: target?.getAttribute('href') ?? null,
      imgSrc: target?.getAttribute('src') ?? null,
      imgAlt: target?.getAttribute('alt') ?? null,
      userData: user // Directly use the provided user data
    };
  }

  /**
   * @private
   * Sends the analytics payload to the backend service.
   * @param {Analytics} payload The complete analytics event data.
   */
  private sendEvent(payload: Analytics): void {
    this.kibana.logGenericEvent(payload).subscribe();
  }
}
