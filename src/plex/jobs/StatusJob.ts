import * as app from '..';

export class StatusJob implements app.core.Job {
  private readonly api = this.ctx.api;
  private readonly logger = new app.core.Logger('Plex', 'StatusJob');

  constructor(
    private readonly ctx: app.Context,
    private readonly items: Array<app.StatusValue>,
    private readonly traceId: string
  ) {}

  async runAsync() {
    this.logger.info(`Checking ${this.traceId}`);
    await this.processAsync();
    this.logger.info(`Finished ${this.traceId}`);
  }

  private async processAsync() {
    // NOTE: Sending a scrobble event to Plex Media Server will cause the server
    // to save the current time. Sorting episodes by view date is accurate up to
    // the second. Therefore, we must wait a second between each scrobble event
    // to maintain the view order read from the metadata files.
    for (const {id, watched, traceId} of this.items.sort(sort)) {
      this.logger.info(`Checking ${traceId}`);
      if (await this.api.episode.statusAsync(id, watched)) {
        this.logger.info(`Finished ${traceId}`);
        await new Promise(x => setTimeout(x, 1000));
      } else {
        this.logger.warn(`Rejected ${traceId}`);
      }
    }
  }
}

function sort(a: app.StatusValue, b: app.StatusValue) {
  const ax = a.lastPlayed.toMillis();
  const bx = b.lastPlayed.toMillis();
  return ax - bx;
}
