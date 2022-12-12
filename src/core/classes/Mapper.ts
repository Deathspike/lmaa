import * as path from 'node:path';

export class Mapper {
  constructor(private readonly mappings: Map<string, string>) {}

  path(fullPath: string) {
    for (const [from, to] of this.mappings.entries()) {
      if (fullPath.startsWith(from)) {
        const relativePath = fullPath.substring(from.length);
        return path.join(to, relativePath);
      }
    }
    return fullPath;
  }
}
