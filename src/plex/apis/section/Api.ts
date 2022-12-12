import * as app from '.';

export class Api extends app.core.Api {
  async listAsync(sectionId: string) {
    try {
      const headers = {accept: 'application/json'};
      const request = this.request(`/library/sections/${sectionId}/all`);
      const response = await fetch(request, {headers});
      const result = (await response.json()) as app.IEntryResponse;
      app.core.validateOrThrow(app.EntryResponse, result);
      return result.MediaContainer.Metadata;
    } catch (err) {
      return undefined;
    }
  }
}
