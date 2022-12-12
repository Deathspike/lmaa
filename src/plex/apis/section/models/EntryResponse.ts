import {EntryResponseContainer} from './EntryResponseContainer';

export const EntryResponse = {
  type: 'object',
  properties: {
    MediaContainer: EntryResponseContainer
  },
  required: ['MediaContainer']
} as const;
