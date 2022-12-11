export const ItemActivityContext = {
  type: 'object',
  properties: {
    librarySectionID: {type: 'string'}
  },
  required: ['librarySectionID']
} as const;
