import * as app from '.';

export class Api {
  constructor(baseUrl: string, token: string) {
    this.episode = new app.episode.Api(baseUrl, token);
    this.section = new app.section.Api(baseUrl, token);
    this.series = new app.series.Api(baseUrl, token);
    this.socket = new app.socket.Api(baseUrl, token);
  }

  readonly episode: app.episode.Api;
  readonly section: app.section.Api;
  readonly series: app.series.Api;
  readonly socket: app.socket.Api;
}
