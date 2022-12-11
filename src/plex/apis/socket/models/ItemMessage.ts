import {ItemMessageContainer} from './ItemMessageContainer';

export const ItemMessage = {
  type: 'object',
  properties: {
    NotificationContainer: ItemMessageContainer
  },
  required: ['NotificationContainer']
} as const;
