import {Entry} from './Entry';

export const EntryResponseContainer = {
  type: 'object',
  properties: {
    Metadata: {type: 'array', items: Entry, minItems: 1}
  },
  required: ['Metadata']
} as const;
