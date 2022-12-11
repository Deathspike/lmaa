import * as cheerio from 'cheerio';
import * as fs from 'node:fs';
import {DateTime} from 'luxon';

export class EpisodeInfo {
  private constructor(private readonly $: cheerio.CheerioAPI) {}

  static async loadAsync(fullPath: string) {
    const xml = await fs.promises.readFile(fullPath, 'utf-8');
    const $ = cheerio.load(xml, {xml: {decodeEntities: false}});
    return new EpisodeInfo($);
  }

  get lastPlayed() {
    const selector = this.$('episodedetails > lastplayed');
    const value = selector.first().text();
    return value.length ? DateTime.fromSQL(value) : undefined;
  }

  get plot() {
    const selector = this.$('episodedetails > plot');
    const value = selector.first().text();
    return value.length ? cheerio.load(value).text() : undefined;
  }

  get premiered() {
    const selector = this.$('episodedetails > premiered');
    const value = selector.first().text();
    return value.length ? DateTime.fromSQL(value).toSQLDate() : undefined;
  }

  get title() {
    const selector = this.$('episodedetails > title');
    const value = selector.first().text();
    return value.length ? cheerio.load(value).text() : undefined;
  }

  get watched() {
    const selector = this.$('episodedetails > watched');
    const value = selector.first().text();
    return value.length ? /^true$/i.test(value) : undefined;
  }
}
