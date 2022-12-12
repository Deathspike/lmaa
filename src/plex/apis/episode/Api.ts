import * as app from '.';

export class Api extends app.core.Api {
  async getAsync(episodeId: string) {
    try {
      const headers = {accept: 'application/json'};
      const request = this.request(`/library/metadata/${episodeId}`);
      const response = await fetch(request, {headers});
      const result = (await response.json()) as app.IItemResponse;
      app.core.validateOrThrow(app.ItemResponse, result);
      return result.MediaContainer.Metadata[0];
    } catch (err) {
      return undefined;
    }
  }

  async listAsync(seriesId: string) {
    try {
      const headers = {accept: 'application/json'};
      const request = this.request(`/library/metadata/${seriesId}/allLeaves`);
      const response = await fetch(request, {headers});
      const result = (await response.json()) as app.IEntryResponse;
      app.core.validateOrThrow(app.EntryResponse, result);
      return result.MediaContainer.Metadata;
    } catch (err) {
      return undefined;
    }
  }

  async putAsync(sectionId: string, value: PutValue) {
    try {
      const param = this.createParam(value);
      const request = this.request(`/library/sections/${sectionId}/all`, param);
      const response = await fetch(request, {method: 'PUT'});
      return response.ok;
    } catch (err) {
      return false;
    }
  }

  async statusAsync(episodeId: string, watched: boolean) {
    try {
      const cmd = watched ? 'scrobble' : 'unscrobble';
      const param = {identifier: 'com.plexapp.plugins.library', key: episodeId};
      const request = this.request(`/:/${cmd}`, param);
      const response = await fetch(request);
      return response.ok;
    } catch (err) {
      return false;
    }
  }

  private createParam(value: PutValue) {
    return {
      id: value.id,
      'originallyAvailableAt.value': value.premiered,
      'summary.value': value.plot,
      'title.value': value.title,
      type: (4).toString()
    };
  }
}

type PutValue = {
  id: string;
  plot?: string;
  premiered?: string;
  title?: string;
};
