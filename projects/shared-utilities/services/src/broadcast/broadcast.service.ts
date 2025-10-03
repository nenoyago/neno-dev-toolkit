import { EventEmitter, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BroadcastService {
  private emitters: { [eventName: string]: EventEmitter<any> } = {};

  /**
   * Registers a listener for a specific event.
   * @param eventName The name of the event to listen for.
   * @param callback The callback function to execute when the event is emitted.
   */
  on<T>(eventName: string, callback: (payload: T) => void): void {
    if (!this.emitters[eventName]) {
      this.emitters[eventName] = new EventEmitter<T>();
    }
    (this.emitters[eventName] as EventEmitter<T>).subscribe(callback);
  }

  /**
   * Removes all listeners for a specific event.
   * @param eventName The name of the event to remove listeners from.
   */
  off(eventName: string): void {
    if (this.emitters[eventName]) {
      this.emitters[eventName] = new EventEmitter<unknown>();
    }
  }

  /**
   * Emits an event to all registered listeners.
   * @param eventName The name of the event to emit.
   * @param payload The payload to send to listeners.
   */
  emit<T>(eventName: string, payload: T): void {
    if (!this.emitters[eventName]) {
      this.emitters[eventName] = new EventEmitter<T>();
    }
    (this.emitters[eventName] as EventEmitter<T>).emit(payload);
  }

  /**
   * Removes all listeners and the emitter for a specific event.
   * @param eventName The name of the event to clear.
   */
  clear(eventName: string): void {
    if (this.emitters[eventName]) {
      delete this.emitters[eventName];
    }
  }
}
