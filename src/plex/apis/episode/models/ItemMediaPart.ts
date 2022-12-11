export const ItemMediaPart = {
  type: 'object',
  properties: {
    file: {type: 'string'}
  },
  required: ['file']
} as const;
