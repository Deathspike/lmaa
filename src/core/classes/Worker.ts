import * as app from '..';

export class Worker extends app.Emitter {
  private readonly logger = new app.Logger('Core', 'Worker');
  private readonly queue = new Array<app.Job>();
  private activeWorkers = 0;

  constructor(private readonly maximumWorkers: number) {
    super();
  }

  add(value: Iterable<app.Job> | app.Job) {
    if (isIterable(value)) {
      this.queue.push(...value);
      this.tryRun();
    } else {
      this.queue.push(value);
      this.tryRun();
    }
  }

  private async runAsync() {
    const add = this.add.bind(this);
    while (this.queue.length) {
      try {
        await this.queue.pop()?.runAsync(add);
      } catch (err) {
        this.logger.error(err);
      }
    }
  }

  private tryRun() {
    while (this.activeWorkers < this.maximumWorkers) {
      this.activeWorkers++;
      this.runAsync().then(() => {
        this.activeWorkers--;
        if (this.activeWorkers) return;
        this.dispatchEvent();
      });
    }
  }
}

function isIterable<T>(value: Iterable<T> | T): value is Iterable<T> {
  return Symbol.iterator in (value as Iterable<T>);
}
