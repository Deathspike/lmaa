import {ItemActivityContext} from './ItemActivityContext';

export const ItemActivity = {
  type: 'object',
  properties: {
    Context: ItemActivityContext,
    type: {type: 'string'}
  },
  required: ['Context', 'type']
} as const;
