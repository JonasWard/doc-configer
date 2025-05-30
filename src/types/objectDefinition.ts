import { FieldDefinition } from './fieldDefinition';

export type ObjectDefinition = { label: string; fields: FieldDefinition[]; canReference: boolean };
