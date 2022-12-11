export const ItemLocation = {
  type: 'object',
  properties: {
    path: {type: 'string'}
  },
  required: ['path']
} as const;
