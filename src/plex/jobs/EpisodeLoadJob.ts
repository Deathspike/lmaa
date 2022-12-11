import * as app from '..';

export class EpisodeLoadJob implements app.core.Job {
  private readonly logger = new app.core.Logger('Plex', 'EpisodeLoadJob');
  private readonly mapper = this.ctx.mapper;

  constructor(
    private readonly ctx: app.Context,
    private readonly item: app.episode.IItem,
    private readonly traceId: string
  ) {}

  async runAsync(add: app.core.JobAdd) {
    this.logger.info(`Checking ${this.traceId}`);
    const videoPath = this.mapper.path(this.item.Media[0]!.Part[0]!.file);
    const nfoPath = videoPath.replace(/\.[^\.]+$/, '.nfo');
    const nfo = await app.core.EpisodeInfo.loadAsync(nfoPath).catch(() => {});
    if (nfo) {
      add(new app.EpisodeStatusJob(this.ctx, this.item, nfo, this.traceId));
      add(new app.EpisodeMetadataJob(this.ctx, this.item, nfo, this.traceId));
      this.logger.info(`Finished ${this.traceId}`);
    } else {
      this.logger.info(`Skipping ${this.traceId}`);
    }
  }
}
