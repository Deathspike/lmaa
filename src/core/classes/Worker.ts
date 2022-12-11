import * as app from '..';

export class Worker extends app.Emitter {
  private readonly logger = new app.Logger('Core', 'Worker');
  private readonly queue = new Array<app.Job>();
  private activeWorkers = 0;

  constructor(private readonly maximumWorkers: number) {
    super();
  }

  add(job: app.Job) {
    this.queue.push(job);
    if (this.activeWorkers >= this.maximumWorkers) return;
    this.runAsync().then(this.tryDrainEvent.bind(this));
  }

  private async runAsync() {
    const add = this.add.bind(this);
    while (this.queue.length) {
      try {
        this.activeWorkers++;
        await this.queue.pop()?.runAsync(add);
      } catch (err) {
        this.logger.error(err);
      } finally {
        this.activeWorkers--;
      }
    }
  }

  private tryDrainEvent() {
    if (this.activeWorkers) return;
    this.dispatchEvent();
  }
}
