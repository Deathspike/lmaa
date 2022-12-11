import {DateTime} from 'luxon';

export class Logger {
  constructor(
    private readonly agent: string,
    private readonly source: string
  ) {}

  error(value: unknown) {
    if (value instanceof Error) {
      this.write('E', value.stack ?? value.message);
    } else if (typeof value === 'string') {
      this.write('E', value);
    } else {
      this.write('E', String(value));
    }
  }

  info(value: string) {
    this.write('I', value);
  }

  warn(value: string) {
    this.write('W', value);
  }

  private write(level: string, value: string) {
    const now = DateTime.now().toISO();
    console.log(`[${now}] (${level}) ${value} [${this.agent}/${this.source}]`);
  }
}
