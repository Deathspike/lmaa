import * as app from '..';
import * as path from 'node:path';

export class SeriesLoadJob implements app.core.Job {
  private readonly logger = new app.core.Logger('Plex', 'SeriesLoadJob');
  private readonly mapper = this.ctx.mapper;

  constructor(
    private readonly ctx: app.Context,
    private readonly item: app.series.IItem,
    private readonly traceId: string
  ) {}

  async runAsync(add: app.core.JobAdd) {
    this.logger.info(`Checking ${this.traceId}`);
    const rootPath = this.mapper.path(this.item.Location[0]!.path);
    const nfoPath = path.join(rootPath, 'tvshow.nfo');
    const nfo = await app.core.SeriesInfo.loadAsync(nfoPath).catch(() => {});
    if (nfo) {
      add(new app.SeriesMetadataJob(this.ctx, this.item, nfo, this.traceId));
      this.logger.info(`Finished ${this.traceId}`);
    } else {
      this.logger.info(`Skipping ${this.traceId}`);
    }
  }
}
