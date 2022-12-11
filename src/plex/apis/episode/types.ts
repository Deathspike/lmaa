import * as app from '.';
import * as jst from 'json-schema-to-ts';
import Schema = jst.FromSchema;

export type IEntry = Schema<typeof app.Entry>;
export type IEntryResponse = Schema<typeof app.EntryResponse>;
export type IItem = Schema<typeof app.Item>;
export type IItemResponse = Schema<typeof app.ItemResponse>;
