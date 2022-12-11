import {ItemActivity} from './ItemActivity';

export const Item = {
  type: 'object',
  properties: {
    Activity: ItemActivity,
    event: {type: 'string'}
  },
  required: ['Activity', 'event']
} as const;
