export class EventEmitter {
  /** @type {{[key: string]: [(...args: any) => void]}[]} */
  events = {};

  constructor() {
    this.events = {};
  }

  /**
   * Subscribe a listener to an event.
   *
   * @param {string} event Name of the event to add the listener to.
   * @param {(...args: any) => void} listener The callback to execute when the event is
   * executed
   */
  on(event, listener) {
    if (!this.events.hasOwnProperty(event)) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  /**
   * Remove a listener from an event
   *
   * @param {string} event Name of the event to remove the listener from
   * @param {(...args: any) => void} listener Listener to remove
   */
  remove(event, listener) {
    if (this.events.hasOwnProperty(event)) {
        const idx = this.events[event].indexOf(listener);
        this.events[event].splice(idx,1);
    }
  }

  /**
   * Emit an event to all subscribed listeners.
   *
   * @param {string} event Name of the event to emit
   * @param  {...any} args Any arguments to pass to the called listeners
   */
  emit(event, ...args) {
    if (this.events.hasOwnProperty(event)) {
      for (const listener of this.events[event]) {
        listener(...args);
      }
    }
  }

  /**
   * Subscribe the listner to a specific event, but only execute the listener
   * once. After the first call the listener is removed from the event.
   *
   * @param {string} event Name of the event to add the listener to
   * @param {(...args: any)} listener Listener to add to the event
   */
  once(event, listener) {
    const emitter = this;
    this.on(event, function t(...args) {
      emitter.remove(event, t);
      listener(...args);
    });
  }
}
