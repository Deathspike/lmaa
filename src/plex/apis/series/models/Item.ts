import {ItemLocation} from './ItemLocation';

export const Item = {
  type: 'object',
  properties: {
    librarySectionID: {type: 'number'},
    Location: {type: 'array', items: ItemLocation, minItems: 1},
    originallyAvailableAt: {type: 'string'},
    ratingKey: {type: 'string'},
    summary: {type: 'string'},
    title: {type: 'string'}
  },
  required: ['librarySectionID', 'Location', 'ratingKey', 'title']
} as const;
