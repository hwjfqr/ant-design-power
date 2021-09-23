import React, { useState } from 'react';
import { TagSelector } from 'ant-design-power';

function CountdownButtonDemo() {
  const options = [];
  Array.from(new Array(100)).forEach((_, idx) => {
    options.push({ label: `选项${idx + 1}`, value: `${idx + 1}` });
  });

  const [selectedVal, setSelectedVal] = useState<string[]>([]);

  return (
    <div>
      <TagSelector
        tags={options}
        value={selectedVal}
        handleOnChange={(val) => setSelectedVal(val)}
      ></TagSelector>
      <div>{selectedVal?.toString()}</div>
    </div>
  );
}

export default CountdownButtonDemo;
