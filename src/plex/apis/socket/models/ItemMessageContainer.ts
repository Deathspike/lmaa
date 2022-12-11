import {Item} from './Item';

export const ItemMessageContainer = {
  type: 'object',
  properties: {
    ActivityNotification: {type: 'array', items: Item, minItems: 1}
  },
  required: ['ActivityNotification']
} as const;
