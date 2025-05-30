import { getLayeredTypes } from '@/logic/nesting/layeredTypes';
import { DataType } from '@/types/dataType';
import { NestedLabelType } from '@/types/nestedLabel';
import { useState } from 'react';

const ContentRenderer: React.FC<{
  content: string | NestedLabelType;
  withDetails: boolean;
  setLabel: (label: string | undefined) => void;
}> = ({ content, withDetails, setLabel }) =>
  typeof content === 'string' ? (
    withDetails ? (
      <span className={`state-tag ${content}`}>{content}</span>
    ) : null
  ) : (
    <NestedLabelsRenderer typeData={content} withDetails={withDetails} setLabel={setLabel} />
  );

const NestedLabelsRenderer: React.FC<{
  typeData: NestedLabelType;
  withDetails: boolean;
  setLabel: (label: string | undefined) => void;
}> = ({ typeData, withDetails, setLabel }) => (
  <div className="flex flex-row gap-1">
    <button
      className="min-w-[120px] bg-[#fbf0df] text-[#1a1a1a] py-0.5 px-.5 rounded-lg font-bold text-sm min-w-[0px] appearance-none cursor-pointer hover:bg-[#f3d5a3] transition-colors duration-100"
      onClick={() => setLabel(typeData._internalTypeName)}
    >
      {typeData._internalTypeName}
    </button>
    <div className="flex flex-col gap-2 justify-center">
      {Object.entries(typeData)
        .filter(
          ([fieldName, content]) => !(fieldName === '_internalTypeName' && (withDetails || typeof content === 'object'))
        )
        .map(([fieldName, content]) => (
          <span className={`flex flex-row gap-1 items-center ${withDetails ? 'nested-content' : ''}`}>
            {withDetails ? <span className="min-w-30"> {fieldName} </span> : null}
            <ContentRenderer content={content} withDetails={withDetails} setLabel={setLabel} />
          </span>
        ))}
    </div>
  </div>
);

export const TypeRenderer: React.FC<{
  label?: string;
  setLabel: (label: string | undefined) => void;
  data: DataType;
}> = ({ label, data, setLabel }) => {
  if (label) console.log(getLayeredTypes(label, data));
  const [showDetails, setShowDetails] = useState(false);

  return label ? (
    <div>
      <input type="checkbox" checked={showDetails} onChange={() => setShowDetails(!showDetails)} />
      <div className="max-w-[calc(100svw-671px-32px-32px] overflow-x-auto">
        <NestedLabelsRenderer typeData={getLayeredTypes(label, data)} withDetails={showDetails} setLabel={setLabel} />
      </div>
    </div>
  ) : null;
};
