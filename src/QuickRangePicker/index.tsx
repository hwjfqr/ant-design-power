import React, { useState, useEffect, ReactNode } from 'react';
import { DatePicker, Tag } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import moment from 'moment';

const { CheckableTag } = Tag;
const { RangePicker } = DatePicker;

/* 
  参数说明：
    config用于配置快捷时间关键字以及对应的值;
      {
        近1月: [moment().subtract(1, 'months'), moment()],
        近6月: [moment().subtract(6, 'months'), moment()],
        近1年: [moment().subtract(1, 'years'), moment()],
      }
    initialKey表示初始值，值必须是快捷时间关键字（这意味着默认的时间必须是config中的其中一个）;
    onChange
*/

type QuickRangePickerProps = {
  presetTimeRange: { [prop: string]: [any, any] };
  defaultPresetTime: string;
  RangePickerComponent: React.FC<RangePickerProps>;
  // onChange;
  children: ReactNode;
};
function QuickRangePicker({
  presetTimeRange = {},
  defaultPresetTime,
  // onChange,
  RangePickerComponent,
  renderRangePickerComponent:()=>{},
  children,
}: QuickRangePickerProps) {
  const [curTag, setCutTag] = useState<string | undefined>(defaultPresetTime);
  const [date, setDate] = useState(
    curTag ? presetTimeRange[curTag] : undefined,
  );

  useEffect(() => {
    setDate(curTag ? presetTimeRange[curTag] : undefined);
  }, [curTag]);

  return (
    <div>
      {Object.keys(presetTimeRange).map((k) => (
        <CheckableTag
          key={k}
          checked={k === curTag}
          onChange={() => {
            setCutTag(k);
            onChange &&
              onChange(
                presetTimeRange[k],
                presetTimeRange[k].map((dateMoment) =>
                  dateMoment.format('YYYY-MM-DD'),
                ) as [string, string],
              );
          }}
        >
          {k}
        </CheckableTag>
      ))}
      {() => {
        children;
      }}
      <RangePickerComponent
        value={date}
        onChange={(date, dateString) => {
          setDate(date as any);
          setCutTag(undefined);
          onChange && onChange(date, dateString);
        }}
      />
    </div>
  );
}

export default QuickRangePicker;
