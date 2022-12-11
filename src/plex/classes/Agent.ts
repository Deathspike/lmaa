import * as app from '..';
import * as crypto from 'node:crypto';

export class Agent {
  private readonly logger = new app.core.Logger('Plex', 'Agent');
  private readonly observer = new app.Observer(this.ctx);

  constructor(
    private readonly ctx: app.Context,
    private readonly worker: app.core.Worker
  ) {
    this.observer.addEventHandler(this.onReceive.bind(this));
  }

  private onReceive(item: app.socket.IItem) {
    if (item.event === 'ended') {
      if (item.Activity.type === 'library.update.section') {
        this.logger.info(`Received ${item.Activity.type}`);
        this.process(item);
      }
    }
  }

  private process(item: app.socket.IItem) {
    const id = item.Activity.Context.librarySectionID;
    const traceId = `${crypto.randomUUID()} (${id})`;
    this.worker.add(new app.SectionJob(this.ctx, id, traceId));
  }
}
