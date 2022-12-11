import * as path from 'node:path';

export class Mapper {
  constructor(private readonly mappings: Map<string, string>) {}

  path(filePath: string) {
    for (const [from, to] of this.mappings.entries()) {
      if (filePath.startsWith(from)) {
        const relativePath = filePath.substring(from.length);
        return path.join(to, relativePath);
      }
    }
    return filePath;
  }
}
