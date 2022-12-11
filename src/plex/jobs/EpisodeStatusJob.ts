import * as app from '..';
import {DateTime} from 'luxon';

export class EpisodeStatusJob implements app.core.Job {
  private readonly logger = new app.core.Logger('Plex', 'EpisodeStatusJob');
  private readonly status = this.ctx.status;

  constructor(
    private readonly ctx: app.Context,
    private readonly item: app.episode.IItem,
    private readonly nfo: app.core.EpisodeInfo,
    private readonly traceId: string
  ) {}

  async runAsync() {
    this.logger.info(`Checking ${this.traceId}`);
    if (this.nfo.watched && !this.item.viewCount) {
      this.status.add(this.createStatus(true));
      this.logger.info(`Finished ${this.traceId}`);
    } else {
      this.logger.info(`Skipping ${this.traceId}`);
    }
  }

  private createStatus(watched: boolean) {
    const id = this.item.ratingKey;
    const lastPlayed = this.nfo.lastPlayed ?? DateTime.fromMillis(0);
    const traceId = this.traceId;
    return {id, lastPlayed, watched, traceId};
  }
}
