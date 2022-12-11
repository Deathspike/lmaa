import * as app from '.';
import * as jst from 'json-schema-to-ts';
import Schema = jst.FromSchema;

export type IItem = Schema<typeof app.Item>;
export type IItemMessage = Schema<typeof app.ItemMessage>;
