import * as app from '..';

export class SectionJob implements app.core.Job {
  private readonly api = this.ctx.api;
  private readonly logger = new app.core.Logger('Plex', 'SectionJob');

  constructor(
    private readonly ctx: app.Context,
    private readonly id: string,
    private readonly traceId: string
  ) {}

  async runAsync(add: app.core.JobAdd) {
    this.logger.info(`Checking ${this.traceId}`);
    const entries = await this.api.series.listAsync(this.id);
    if (entries) {
      this.process(add, entries);
      this.logger.info(`Finished ${this.traceId}`);
    } else {
      this.logger.warn(`Rejected ${this.traceId}`);
    }
  }

  private process(add: app.core.JobAdd, entries: Array<app.series.IEntry>) {
    for (const entry of entries.reverse()) {
      const traceId = `${entry.title} (${entry.ratingKey})`;
      add(new app.SeriesJob(this.ctx, entry.ratingKey, traceId));
    }
  }
}
