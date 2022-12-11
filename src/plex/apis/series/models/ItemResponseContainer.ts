import {Item} from './Item';

export const ItemResponseContainer = {
  type: 'object',
  properties: {
    Metadata: {type: 'array', items: Item, minItems: 1}
  },
  required: ['Metadata']
} as const;
