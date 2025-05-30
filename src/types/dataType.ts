import { EnumDefinition } from './enumObject';
import { ObjectDefinition } from './objectDefinition';

export type DataType = {
  enums: EnumDefinition[];
  types: ObjectDefinition[];
};
