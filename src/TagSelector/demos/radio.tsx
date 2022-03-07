import React, { useState } from 'react';
import { TagSelector } from 'ant-design-power';

function TagSelectorDemo() {
  const options = [
    { label: '北京', value: 'Beijing' },
    { label: '上海', value: 'Shanghai' },
    { label: '广州', value: 'Guangzhou' },
    { label: '深圳', value: 'Shenzhen' },
  ];
  const [selectedVal, setSelectedVal] = useState<string>('Beijing');

  return (
    <TagSelector
      type="radio"
      tags={options}
      value={selectedVal}
      onChange={(val) => {
        setSelectedVal(val);
      }}
    ></TagSelector>
  );
}

export default TagSelectorDemo;
