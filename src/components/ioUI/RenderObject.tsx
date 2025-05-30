import { ObjectDefinition } from '@/types/objectDefinition';
import { TextInput } from './TextInput';
import { FieldRenderer } from './FieldRenderer';
import { DefaultField } from '@/logic/defaultOptions';
import { getFieldValidationStateForObjectDefinition } from '@/logic/validation';
import { ValidationObjectMap } from '@/types/validationType';
import { EnumDefinition } from '@/types/enumObject';
import { useEffect, useRef } from 'react';

export const RenderObject: React.FC<{
  o: ObjectDefinition;
  updateObject: (o: ObjectDefinition) => void;
  deleteObject: () => void;
  validReferenceTypes: (ObjectDefinition | EnumDefinition)[];
  objectValidationStates: ValidationObjectMap;
  setLabelInFocus: (label: string) => void;
  labelInFocus: string;
}> = ({
  o,
  updateObject,
  deleteObject,
  validReferenceTypes,
  objectValidationStates,
  setLabelInFocus,
  labelInFocus
}) => {
  const fieldValidationStates = getFieldValidationStateForObjectDefinition(o);
  const divRef = useRef(null);

  useEffect(() => {
    if (labelInFocus && labelInFocus === o.label && divRef.current)
      (divRef.current as any).focus({ preventScroll: false, focusVisible: true });
  }, [labelInFocus]);

  return (
    <div className="flex flex-col gap-2 rounded-lg p-2 object-state w-160">
      <div
        className={`grid gap-1 grid-cols-[3fr_1fr_auto_25px] p-1 rounded-lg object-state ${
          objectValidationStates[o.label]
        }`}
      >
        <TextInput onChange={(label) => updateObject({ ...o, label })} stateValue={o.label} />
        <span className="p-1 flex flex-row gap-1">
          <input
            type="checkbox"
            checked={o.canReference}
            onChange={() => updateObject({ ...o, canReference: !o.canReference })}
          />
          <span>can reference</span>
        </span>

        <button
          className="bg-[#fbf0df] text-[#1a1a1a] py-1.5 px-3 rounded-lg font-bold text-sm min-w-[0px] appearance-none cursor-pointer hover:bg-[#f3d5a3] transition-colors duration-100"
          onClick={deleteObject}
        >
          - del
        </button>
        <button ref={divRef} onClick={() => setLabelInFocus(o.label)}>
          🎧
        </button>
      </div>
      <div className="grid gap-1 grid-cols-[1fr_auto_60px]">
        {o.fields.map((field, i) => (
          <FieldRenderer
            key={i}
            field={field}
            updateField={(f) => updateObject({ ...o, fields: [...o.fields.slice(0, i), f, ...o.fields.slice(i + 1)] })}
            deleteField={() => updateObject({ ...o, fields: [...o.fields.slice(0, i + 1), ...o.fields.slice(i)] })}
            validReferenceTypes={validReferenceTypes}
            fieldValidationStates={fieldValidationStates}
          />
        ))}
        <button
          className="bg-[#fbf0df] text-[#1a1a1a] py-1.5 px-3 rounded-lg font-bold text-sm min-w-[0px] appearance-none cursor-pointer hover:bg-[#f3d5a3] transition-colors duration-100"
          onClick={() => updateObject({ ...o, fields: [...o.fields, DefaultField] })}
        >
          + add field
        </button>
      </div>
    </div>
  );
};
