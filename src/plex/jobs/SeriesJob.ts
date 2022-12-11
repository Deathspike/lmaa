import * as app from '..';

export class SeriesJob implements app.core.Job {
  private readonly api = this.ctx.api;
  private readonly logger = new app.core.Logger('Plex', 'SeriesJob');

  constructor(
    private readonly ctx: app.Context,
    private readonly id: string,
    private readonly traceId: string
  ) {}

  async runAsync(add: app.core.JobAdd) {
    this.logger.info(`Checking ${this.traceId}`);
    const item = await this.api.series.getAsync(this.id);
    if (item) {
      add(new app.SeriesRelatedJob(this.ctx, item, this.traceId));
      add(new app.SeriesLoadJob(this.ctx, item, this.traceId));
      this.logger.info(`Finished ${this.traceId}`);
    } else {
      this.logger.warn(`Rejected ${this.traceId}`);
    }
  }
}
