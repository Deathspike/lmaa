import * as app from '..';

export class SeriesRelatedJob implements app.core.Job {
  private readonly api = this.ctx.api;
  private readonly logger = new app.core.Logger('Plex', 'SeriesRelatedJob');

  constructor(
    private readonly ctx: app.Context,
    private readonly item: app.series.IItem,
    private readonly traceId: string
  ) {}

  async runAsync(add: app.core.JobAdd) {
    this.logger.info(`Checking ${this.traceId}`);
    const entries = await this.api.episode.listAsync(this.item.ratingKey);
    if (entries) {
      add(this.process(entries));
      this.logger.info(`Finished ${this.traceId}`);
    } else {
      this.logger.warn(`Rejected ${this.traceId}`);
    }
  }

  private *process(entries: Array<app.episode.IEntry>) {
    for (const entry of entries.reverse()) {
      const episode = entry.index.toString().padStart(2, '0');
      const season = entry.parentIndex.toString().padStart(2, '0');
      const traceId = `${this.traceId} S${season}E${episode} (${entry.ratingKey})`;
      yield new app.EpisodeJob(this.ctx, entry.ratingKey, traceId);
    }
  }
}
