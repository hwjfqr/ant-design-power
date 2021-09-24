import React, { useState } from 'react';
import { TagSelector } from 'ant-design-power';

function CountdownButtonDemo() {
  const options = [
    { label: '北京', value: 'Beijing' },
    { label: '上海', value: 'Shanghai' },
    { label: '广州', value: 'Guangzhou' },
    { label: '深圳', value: 'Shenzhen' },
  ];
  const [selectedVal, setSelectedVal] = useState<string>('1');

  return (
    <TagSelector
      type="radio"
      tags={options}
      value={selectedVal}
      onChange={(val) => {
        console.log(val);
        setSelectedVal(val as string);
      }}
    ></TagSelector>
  );
}

export default CountdownButtonDemo;
