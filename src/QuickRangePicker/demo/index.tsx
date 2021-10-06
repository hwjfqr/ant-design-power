import React, { useState } from 'react';
import { DatePicker } from 'antd';
import { QuickRangePicker } from 'ant-design-power';

const { RangePicker } = DatePicker;

function QuickRangePickerDemo() {
  return (
    <QuickRangePicker
      presetTimeRange={{}}
      defaultPresetTime=""
      RangePickerComponent={<RangePicker></RangePicker>}
    ></QuickRangePicker>
  );
}

export default QuickRangePickerDemo;
