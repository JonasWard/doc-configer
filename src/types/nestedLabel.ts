export type NestedLabelMap = { [typeName: string]: { [fieldName: string]: string } };
export type NestedLabelType = { _internalTypeName: string; [fieldName: string]: string | NestedLabelType };
