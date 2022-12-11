export const Entry = {
  type: 'object',
  properties: {
    ratingKey: {type: 'string'},
    title: {type: 'string'}
  },
  required: ['ratingKey', 'title']
} as const;
