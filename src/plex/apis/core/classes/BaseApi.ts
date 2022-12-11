export abstract class BaseApi {
  constructor(
    private readonly baseUrl: string,
    private readonly token: string
  ) {}

  protected request(url: string, params?: Record<string, string | undefined>) {
    const result = new URL(url, this.baseUrl);
    merge(result, params);
    result.searchParams.append('X-Plex-Token', this.token);
    return result.toString();
  }
}

function merge(url: URL, params?: Record<string, string | undefined>) {
  if (params) {
    for (const [name, value] of Object.entries(params)) {
      if (typeof value === 'undefined') continue;
      url.searchParams.append(name, value);
    }
  }
}
