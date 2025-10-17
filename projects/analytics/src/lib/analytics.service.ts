import { Injectable, inject } from '@angular/core';

import { ANALYTICS_CONFIG, KibanaHttpService } from 'analytics';
import { of } from 'rxjs';
import { timeout, catchError } from 'rxjs/operators';

import { defaultTagNames } from './analytics.constants';
import {
  TrackingData,
  AnalyticsUserData,
  Analytics,
  TrackingCallbacks
} from './analytics.types';

/**
 * @description
 * A type guard utility to check if an object is of type `TrackingData`.
 */
function isTrackingObject(arg: Event | TrackingData): arg is TrackingData {
  return (arg as TrackingData).id !== undefined;
}

/**
 * @description
 * Service responsible for tracking user interactions and sending analytics events.
 * It is decoupled from any application state and requires user data
 * in each tracking call.
 */
@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private readonly kibana = inject(KibanaHttpService);
  private readonly config = inject(ANALYTICS_CONFIG);

  private readonly TIMEOUT_MS = 5000;
  private readonly INTERACTIVE_TAGS: string[] = [];

  constructor() {
    this.INTERACTIVE_TAGS = this.config.tagNames || defaultTagNames;
  }

  /**
   * Tracks a user interaction event based on a DOM Event.
   * Extracts tracking information from 'data-tracking-id' and 'data-tracking-object'
   * and allows success/failure callbacks.
   *
   * @param {Event} event The DOM Event to be tracked.
   * @param {AnalyticsUserData} userData The user data to be associated.
   * @param {TrackingCallbacks} [notify] Optional callbacks to notify request success/failure.
   */
  public track(
    event: Event,
    userData: AnalyticsUserData,
    notify?: TrackingCallbacks
  ): void;

  /**
   * Tracks a custom and programmatic event.
   * Notification callbacks are included in the `trackingData.notify` object.
   *
   * @param {TrackingData} trackingData An object containing the tracking `id` and optional `data`.
   * @param {AnalyticsUserData} userData The user data.
   * @param {Event} [event] Optional DOM Event to enrich the payload with target element details.
   */
  public track(
    trackingData: TrackingData,
    userData: AnalyticsUserData,
    event?: Event
  ): void;

  // Unified implementation
  public track(
    eventOrTrackingData: Event | TrackingData,
    userData: AnalyticsUserData,
    optionalNotifyOrEvent?: Event | TrackingCallbacks
  ): void {
    if (!userData) {
      console.warn(
        'AnalyticsService: User data was not provided. Event will not be tracked.'
      );
      return;
    }

    let trackingId: string | null;
    let objectData: string | null;
    let event: Event | undefined;
    let callbacks: TrackingCallbacks | undefined;
    let targetElement: HTMLElement | undefined;

    if (isTrackingObject(eventOrTrackingData)) {
      event = optionalNotifyOrEvent as Event;
      callbacks = eventOrTrackingData.notify;

      // Finds the closest target element with a tracking attribute (or uses the target itself)
      targetElement =
        ((event?.target as HTMLElement)?.closest(
          '[data-tracking-id], [data-tracking-object]'
        ) as HTMLElement) || (event?.target as HTMLElement);

      trackingId = eventOrTrackingData.id;
      objectData = eventOrTrackingData.data
        ? JSON.stringify(eventOrTrackingData.data)
        : targetElement?.getAttribute('data-tracking-object') || null;
    } else {
      event = eventOrTrackingData;
      callbacks = optionalNotifyOrEvent as TrackingCallbacks;

      // Finds the closest target element with a tracking attribute (or uses the target itself)
      targetElement =
        ((event.target as HTMLElement)?.closest(
          '[data-tracking-id], [data-tracking-object]'
        ) as HTMLElement) || (event.target as HTMLElement);

      trackingId = targetElement?.getAttribute('data-tracking-id') || null;
      objectData = targetElement?.getAttribute('data-tracking-object') || null;
    }

    if (!this.isTrackable(trackingId, targetElement)) {
      return;
    }

    const basePayload = this.buildBasePayload(userData, targetElement);

    const analyticsPayload: Analytics = {
      ...basePayload,
      trackingId,
      objectData
    };

    this.sendEvent(analyticsPayload, callbacks);
  }

  /**
   * @private
   * Determines if an event should be tracked.
   * Improved implementation focusing on the presence of `trackingId` or interactive tags.
   */
  private isTrackable(
    trackingId: string | null,
    target?: HTMLElement | null
  ): boolean {
    // If the tracking ID was provided, track (explicit intent).
    if (trackingId) {
      return true;
    }

    if (!target) {
      return false;
    }

    // If there is no ID, only track if it is a common interactive element
    const tagName = target.tagName?.toUpperCase() || '';

    const isButtonRole =
      target.getAttribute('role')?.toLowerCase() === 'button';
    const isInteractive =
      this.INTERACTIVE_TAGS.includes(tagName) ||
      target.hasAttribute('tabindex') ||
      isButtonRole;

    return isInteractive;
  }

  /**
   * @private
   * Builds the base payload for an analytics event.
   */
  private buildBasePayload(
    user: AnalyticsUserData,
    target?: HTMLElement
  ): Omit<Analytics, 'trackingId' | 'objectData'> {
    const url = window.location.href;

    return {
      url,
      // Use href if it is a link, otherwise the current URL.
      urlTo: target?.getAttribute('href') ?? target?.baseURI ?? url,
      type: 'click', // Simplified type for this example
      cssClasses: target?.classList?.value ?? '',
      htmlId: target?.id ?? '',
      htmlTag: target?.tagName ?? '',
      htmlText: target?.textContent?.trim() ?? null,
      linkHref: target?.getAttribute('href') ?? null,
      imgSrc: target?.getAttribute('src') ?? null,
      imgAlt: target?.getAttribute('alt') ?? null,
      userData: user
    };
  }

  /**
   * @private
   * Sends the analytics payload to the backend service, with error handling and timeout.
   * @param {Analytics} payload The complete event data.
   * @param {TrackingCallbacks} [callbacks] Optional callbacks for notification.
   */
  private sendEvent(payload: Analytics, callbacks?: TrackingCallbacks): void {
    this.kibana
      .logGenericEvent(payload)
      .pipe(
        timeout(this.TIMEOUT_MS),
        catchError((error) => {
          console.error(
            'AnalyticsService: Error or Timeout sending event to backend.',
            error,
            payload
          );
          callbacks?.onFailure?.(error);
          return of(null);
        })
      )
      .subscribe({
        next: () => {
          callbacks?.onSuccess?.();
        }
      });
  }
}
