import * as cheerio from 'cheerio';
import * as fs from 'node:fs';
import {DateTime} from 'luxon';

export class SeriesInfo {
  private constructor(private readonly $: cheerio.CheerioAPI) {}

  static async loadAsync(fullPath: string) {
    const xml = await fs.promises.readFile(fullPath, 'utf-8');
    const $ = cheerio.load(xml, {xml: {decodeEntities: false}});
    return new SeriesInfo($);
  }

  get plot() {
    const selector = this.$('tvshow > plot');
    const value = selector.first().text();
    return value.length ? cheerio.load(value).text() : undefined;
  }

  get premiered() {
    const selector = this.$('tvshow > premiered');
    const value = selector.first().text();
    return value.length ? DateTime.fromSQL(value).toSQLDate() : undefined;
  }

  get title() {
    const selector = this.$('tvshow > title');
    const value = selector.first().text();
    return value.length ? cheerio.load(value).text() : undefined;
  }
}
