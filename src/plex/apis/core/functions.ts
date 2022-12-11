import Ajv from 'ajv';
import {AnySchema} from 'ajv';
const ajv = new Ajv();

export function validateOrThrow<T>(schema: AnySchema, value: T) {
  if (ajv.validate(schema, value)) return;
  throw new Error(ajv.errorsText());
}
