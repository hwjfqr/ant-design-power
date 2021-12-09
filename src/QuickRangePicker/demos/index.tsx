import React, { useState } from 'react';
import { QuickRangePicker } from 'ant-design-power';
import type { RangePickerProps } from 'antd/es/date-picker/generatePicker';
import moment from 'moment';

type RangePickerValue = RangePickerProps<moment.Moment>['value'];

function QuickRangePickerDemo() {
  const [date, setDate] = useState<RangePickerValue>();
  return (
    <div>
      <QuickRangePicker
        presetTimeRange={{
          近1月: [moment().subtract(1, 'months'), moment()],
          近6月: [moment().subtract(6, 'months'), moment()],
          近1年: [moment().subtract(1, 'years'), moment()],
        }}
        defaultPresetTime="近1月"
        value={date}
        onChange={(date: RangePickerValue) => {
          console.log(date);
          setDate(date);
        }}
      ></QuickRangePicker>
    </div>
  );
}

export default QuickRangePickerDemo;
