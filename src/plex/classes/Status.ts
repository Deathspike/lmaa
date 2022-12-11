import * as app from '..';
import * as crypto from 'node:crypto';

export class Status {
  private readonly queue = new Array<app.StatusValue>();

  constructor(
    private readonly ctx: app.Context,
    private readonly worker: app.core.Worker
  ) {
    worker.addEventHandler(this.onDrain.bind(this));
  }

  add(status: app.StatusValue) {
    this.queue.push(status);
  }

  private onDrain() {
    if (this.queue.length) {
      const items = this.queue.splice(0, this.queue.length);
      const traceId = crypto.randomUUID();
      this.worker.add(new app.StatusJob(this.ctx, items, traceId));
    }
  }
}
