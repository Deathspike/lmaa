import * as app from '..';

export class EpisodeMetadataJob implements app.core.Job {
  private readonly api = this.ctx.api;
  private readonly logger = new app.core.Logger('Plex', 'EpisodeMetadataJob');
  private readonly sectionId = this.item.librarySectionID.toString();

  constructor(
    private readonly ctx: app.Context,
    private readonly item: app.episode.IItem,
    private readonly nfo: app.core.EpisodeInfo,
    private readonly traceId: string
  ) {}

  async runAsync() {
    this.logger.info(`Checking ${this.traceId}`);
    const value = this.createPatch();
    if (!value.plot && !value.premiered && !value.title) {
      this.logger.info(`Skipping ${this.traceId}`);
    } else if (await this.api.episode.putAsync(this.sectionId, value)) {
      this.logger.info(`Finished ${this.traceId}`);
    } else {
      this.logger.warn(`Rejected ${this.traceId}`);
    }
  }

  private createPatch() {
    const id = this.item.ratingKey;
    const plot = ex(this.nfo.plot, this.item.summary);
    const premiered = ex(this.nfo.premiered, this.item.originallyAvailableAt);
    const title = ex(this.nfo.title, this.item.title);
    return {id, plot, premiered, title};
  }
}

function ex(a?: string, b?: string) {
  const ax = a || undefined;
  const bx = b || undefined;
  return ax && ax !== bx ? ax : undefined;
}
