class Events {
  callbacks = [];
  nextId = 0;

  on(eventName, caller, callback) {
    this.nextId += 1;
    this.callbacks.push({
      id: this.nextId,
      eventName,
      caller,
      callback,
    });
    return this.nextId;
  }
}

export const events = new Event();
