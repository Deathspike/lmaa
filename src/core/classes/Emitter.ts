export class Emitter<T = void> {
  private readonly handlers = new Set<(event: T) => void>();

  addEventHandler(handler: (event: T) => void) {
    this.handlers.add(handler);
  }

  dispatchEvent(event: T) {
    this.handlers.forEach(x => x(event));
  }

  removeEventHandler(handler: (event: T) => void) {
    this.handlers.delete(handler);
  }
}
