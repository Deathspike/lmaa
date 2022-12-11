import {ItemResponseContainer} from './ItemResponseContainer';

export const ItemResponse = {
  type: 'object',
  properties: {
    MediaContainer: ItemResponseContainer
  },
  required: ['MediaContainer']
} as const;
