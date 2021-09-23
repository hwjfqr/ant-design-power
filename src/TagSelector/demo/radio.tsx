import React, { useState } from 'react';
import { TagSelector } from 'ant-design-power';

function CountdownButtonDemo() {
  const options = [
    { label: '北京', value: 'Beijing' },
    { label: '上海', value: 'Shanghai' },
    { label: '广州', value: 'Guangzhou' },
    { label: '深圳', value: 'Shenzhen' },
  ];
  const [selectedVal, setSelectedVal] = useState<string>();

  return (
    <div>
      <TagSelector
        type="radio"
        tags={options}
        value={selectedVal}
        handleOnChange={(val) => setSelectedVal(val)}
      ></TagSelector>
      <p>{selectedVal}</p>
    </div>
  );
}

export default CountdownButtonDemo;
