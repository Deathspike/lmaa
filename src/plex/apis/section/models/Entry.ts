export const Entry = {
  type: 'object',
  properties: {
    guid: {type: 'string'},
    ratingKey: {type: 'string'},
    title: {type: 'string'},
    type: {type: 'string'}
  },
  required: ['guid', 'ratingKey', 'title', 'type']
} as const;
