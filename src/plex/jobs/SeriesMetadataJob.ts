import * as app from '..';

export class SeriesMetadataJob implements app.core.Job {
  private readonly api = this.ctx.api;
  private readonly logger = new app.core.Logger('Plex', 'SeriesMetadataJob');
  private readonly sectionId = this.item.librarySectionID.toString();

  constructor(
    private readonly ctx: app.Context,
    private readonly item: app.series.IItem,
    private readonly nfo: app.core.SeriesInfo,
    private readonly traceId: string
  ) {}

  async runAsync() {
    this.logger.info(`Checking ${this.traceId}`);
    const value = this.createPatch();
    if (!this.shouldPatch(value)) {
      this.logger.info(`Skipping ${this.traceId}`);
    } else if (await this.api.series.putAsync(this.sectionId, value)) {
      this.logger.info(`Finished ${this.traceId}`);
    } else {
      this.logger.warn(`Rejected ${this.traceId}`);
    }
  }

  private createPatch() {
    const id = this.item.ratingKey;
    const plot = this.nfo.plot;
    const premiered = this.nfo.premiered?.toSQLDate();
    const title = this.nfo.title;
    return {id, plot, premiered, title};
  }

  private shouldPatch(patch: ReturnType<typeof this.createPatch>) {
    const plot = !app.eq(patch.plot, this.item.summary);
    const premiered = !app.eq(patch.premiered, this.item.originallyAvailableAt);
    const title = !app.eq(patch.title, this.item.title);
    return plot || premiered || title;
  }
}
