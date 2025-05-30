import './index.css';
import { APITester } from './APITester';

import logo from './logo.svg';
import reactLogo from './react.svg';
import { Renderer } from './components/ioUI/Renderer';
import { useEffect, useState } from 'react';
import { getValidReferenceTypes } from './logic/references';
import { LoadJSON } from './components/ioUI/LoadJSON';
import { SaveJSON } from './components/ioUI/SaveJSON';
import { DataType } from './types/dataType';
import { DefaultBaseObjectDefinitions } from './logic/defaultOptions';
import { Enums } from './components/ioUI/Enums';
import { TypeRenderer } from './components/visualisation/TypeRenderer';

export function App() {
  const [data, setData] = useState<DataType>(DefaultBaseObjectDefinitions);
  const [labelInFocus, setLabelInFocus] = useState<string | undefined>();

  useEffect(() => console.log(data), [data]);

  return (
    <div className="p-8 flex gap-6 flex-row">
      <div className="w-full">
        <span className="flex flex-row gap-2 p-2 text-black">
          <LoadJSON setData={setData} />
          <SaveJSON data={data} />
        </span>
        <div className="max-h-[85svh] overflow-y-scroll">
          <Enums enums={data.enums} setEnums={(enums) => setData({ ...data, enums })} objectValidationStates={{}} />
          <Renderer
            objects={data.types}
            updateObjects={(types) => setData({ ...data, types })}
            validReferenceTypes={getValidReferenceTypes(data)}
            setLabelInFocus={setLabelInFocus}
            labelInFocus={labelInFocus ?? ''}
          />
        </div>
      </div>
      <TypeRenderer label={labelInFocus} setLabel={setLabelInFocus} data={data} />
    </div>
  );
}

export default App;
