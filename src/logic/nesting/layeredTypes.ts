import { DataType } from '@/types/dataType';
import { FieldBaseType } from '@/types/fieldBaseType';
import { FieldDefinition } from '@/types/fieldDefinition';
import { NestedLabelMap, NestedLabelType } from '@/types/nestedLabel';

const isSpecialType = (type: string) => !Object.values(FieldBaseType).includes(type as FieldBaseType);
const isEnum = (type: string, data: DataType) => Boolean(data.enums.find(({ label }) => label === type));

const getFieldMapFromFields = (fields: FieldDefinition[], data: DataType) =>
  Object.fromEntries(fields.map(([fieldName, type]) => [fieldName, isEnum(type, data) ? 'enum' : type]));

const getMappedObject = (data: DataType): NestedLabelMap =>
  Object.fromEntries(data.types.map((o) => [o.label, getFieldMapFromFields(o.fields, data)]));

const constructNestedLabelType = (typeMap: NestedLabelMap, type: string, previousTypes: string[]) =>
  Object.fromEntries([
    ...Object.entries(typeMap[type]).map(([fieldName, typeObject]) => [
      fieldName,
      getNestedLabelType(typeObject, typeMap, [...previousTypes, type])
    ]),
    ['_internalTypeName', type]
  ]);

const getNestedLabelType = (
  type: string,
  typeMap: NestedLabelMap,
  previousTypes: string[]
): string | { [fieldName: string]: string | NestedLabelType } =>
  typeMap[type] && !previousTypes.includes(type)
    ? constructNestedLabelType(typeMap, type, [...previousTypes, type])
    : previousTypes.includes(type)
    ? { _internalTypeName: type }
    : type;

export const getLayeredTypes = (type: string, data: DataType): NestedLabelType => {
  const typeMap = getMappedObject(data);
  return constructNestedLabelType(typeMap, type, []);
};
