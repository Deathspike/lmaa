import {ItemMedia} from './ItemMedia';

export const Item = {
  type: 'object',
  properties: {
    librarySectionID: {type: 'number'},
    Media: {type: 'array', items: ItemMedia, minItems: 1},
    originallyAvailableAt: {type: 'string'},
    ratingKey: {type: 'string'},
    summary: {type: 'string'},
    title: {type: 'string'},
    viewCount: {type: 'number'}
  },
  required: ['librarySectionID', 'Media', 'ratingKey']
} as const;
