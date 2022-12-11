import {ItemMediaPart} from './ItemMediaPart';

export const ItemMedia = {
  type: 'object',
  properties: {
    Part: {type: 'array', items: ItemMediaPart, minItems: 1}
  },
  required: ['Part']
} as const;
