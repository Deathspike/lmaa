import * as app from '..';

export class Context {
  constructor(api: app.Api, mapper: app.core.Mapper, worker: app.core.Worker) {
    this.api = api;
    this.mapper = mapper;
    this.status = new app.Status(this, worker);
  }

  readonly api: app.Api;
  readonly mapper: app.core.Mapper;
  readonly status: app.Status;
}
