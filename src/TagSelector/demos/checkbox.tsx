import React, { useState } from 'react';
import { TagSelector } from 'ant-design-power';

function TagSelectorCheckboxDemo() {
  const options: { label: string; value: string }[] = [];
  Array.from(new Array(100)).forEach((_, idx) => {
    options.push({ label: `选项${idx + 1}`, value: `${idx + 1}` });
  });

  const [selectedVal, setSelectedVal] = useState<string[]>(['all']);

  return (
    <TagSelector
      tags={options}
      value={selectedVal}
      displayMaxOptionLength={20}
      showAll
      onChange={(val) => {
        setSelectedVal(val);
      }}
    ></TagSelector>
  );
}

export default TagSelectorCheckboxDemo;
