import { ObjectDefinition } from '@/types/objectDefinition';
import { RenderObject } from './RenderObject';
import { DefaultObject } from '@/logic/defaultOptions';
import { getObjectValidationStateForObjectDefinitions } from '@/logic/validation';
import { EnumDefinition } from '@/types/enumObject';

export const Renderer: React.FC<{
  objects: ObjectDefinition[];
  updateObjects: (newObjects: ObjectDefinition[]) => void;
  validReferenceTypes: (ObjectDefinition | EnumDefinition)[];
  setLabelInFocus: (label: string) => void;
  labelInFocus: string;
}> = ({ objects, updateObjects, validReferenceTypes, setLabelInFocus, labelInFocus }) => {
  const objectValidationStates = getObjectValidationStateForObjectDefinitions(objects);

  return (
    <>
      <div className="flex flex-col flex-wrap gap-2 text-slate-950 rounded-lg p-2">
        {objects.map((o, i) => (
          <RenderObject
            o={o}
            updateObject={(o) => updateObjects([...objects.slice(0, i), o, ...objects.slice(i + 1)])}
            deleteObject={() => updateObjects([...objects.slice(0, i), ...objects.slice(i + 1)])}
            key={i}
            validReferenceTypes={validReferenceTypes}
            objectValidationStates={objectValidationStates}
            setLabelInFocus={setLabelInFocus}
            labelInFocus={labelInFocus}
          />
        ))}
      </div>
      <button
        className="bg-[#fbf0df] text-[#1a1a1a] py-1.5 px-3 rounded-lg font-bold text-sm min-w-[0px] appearance-none cursor-pointer hover:bg-[#f3d5a3] transition-colors duration-100"
        onClick={() => updateObjects([...objects, DefaultObject])}
      >
        + add object
      </button>
    </>
  );
};
