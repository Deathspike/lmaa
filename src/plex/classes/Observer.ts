import * as app from '..';
import * as ws from 'ws';

export class Observer extends app.core.Emitter<app.socket.IItem> {
  private readonly api = this.ctx.api;
  private readonly logger = new app.core.Logger('Plex', 'Observer');

  constructor(private readonly ctx: app.Context) {
    super();
    this.runAsync();
  }

  private onReceive(value: unknown) {
    if (this.api.socket.validateMessage(value)) {
      const items = value.NotificationContainer.ActivityNotification;
      items.forEach(x => this.dispatchEvent(x));
    }
  }

  private async runAsync() {
    while (true) {
      this.logger.info('Fetching connection');
      const socket = await this.api.socket.connectAsync();
      if (socket) {
        this.logger.info('Finished connection');
        await this.waitAsync(socket);
      } else {
        this.logger.warn('Rejected connection');
        await new Promise(x => setTimeout(x, 10000));
      }
    }
  }

  private async waitAsync(socket: ws.WebSocket) {
    await new Promise(resolve => {
      socket.on('close', resolve);
      socket.on('message', x => this.onReceive(parse(x)));
    });
  }
}

function parse(value: ws.RawData) {
  try {
    return JSON.parse(value.toString());
  } catch (error) {
    return undefined;
  }
}
