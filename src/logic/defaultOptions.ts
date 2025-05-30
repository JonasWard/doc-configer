import { DataType } from '@/types/dataType';
import { EnumDefinition } from '@/types/enumObject';
import { FieldBaseType } from '@/types/fieldBaseType';
import { FieldDefinition } from '@/types/fieldDefinition';
import { ObjectDefinition } from '@/types/objectDefinition';

const StringObject = { label: FieldBaseType.string, fields: [], canReference: false };
const NumberObject = { label: FieldBaseType.number, fields: [], canReference: false };
const BooleanObject = { label: FieldBaseType.bool, fields: [], canReference: false };

export const BaseObjectDefinitions: ObjectDefinition[] = [StringObject, NumberObject, BooleanObject];
export const DefaultObject: ObjectDefinition = {
  label: 'new object',
  fields: [],
  canReference: true
};
export const DefaultField: FieldDefinition = ['new field', 'string', false, false, false];
export const DefaultEnum: EnumDefinition = {
  label: 'an enum',
  stringValues: ['value 1', 'value 2']
};
export const DefaultBaseObjectDefinitions: DataType = {
  enums: [DefaultEnum],
  types: [{ label: 'something', fields: [DefaultField], canReference: false }]
};
