export const Entry = {
  type: 'object',
  properties: {
    index: {type: 'number'},
    parentIndex: {type: 'number'},
    ratingKey: {type: 'string'}
  },
  required: ['index', 'parentIndex', 'ratingKey']
} as const;
