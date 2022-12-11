import * as app from '.';
import * as ws from 'ws';

export class Api extends app.core.BaseApi {
  async connectAsync() {
    return new Promise<ws.WebSocket | undefined>(resolve => {
      const url = this.createWebsocketUrl();
      const socket = new ws.WebSocket(url);
      socket.on('close', () => resolve(undefined));
      socket.on('error', () => {});
      socket.on('open', () => resolve(socket));
    });
  }

  validateMessage(value: unknown): value is app.IItemMessage {
    try {
      app.core.validateOrThrow(app.ItemMessage, value);
      return true;
    } catch (err) {
      return false;
    }
  }

  private createWebsocketUrl() {
    const expression = /^http(s)?:\/\//i;
    const url = this.request('/:/websockets/notifications');
    return url.replace(expression, (_, x) => (x ? 'wss://' : 'ws://'));
  }
}
