import React, { useState, useEffect } from 'react';
import { DatePicker, Tag } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker/index';

const { CheckableTag } = Tag;
const { RangePicker } = DatePicker;

type QuickRangePickerProps = {
  /**
   * 预设时间范围
   *  { [ prop:string ]:[ Moment|Dayjs, Moment|Dayjs ] }
   */
  presetTimeRange?: { [prop: string]: [any, any] };

  /**
   * 默认时间范围
   */
  defaultPresetTime?: string;
};
function QuickRangePicker({
  presetTimeRange,
  defaultPresetTime,
  ...rest
}: QuickRangePickerProps & RangePickerProps) {
  const [tag, setTag] = useState(defaultPresetTime);

  useEffect(() => {
    if (defaultPresetTime && presetTimeRange) {
      rest.onChange &&
        rest.onChange(
          presetTimeRange[defaultPresetTime],
          presetTimeRange[defaultPresetTime].map((item) => item.toString()) as [
            string,
            string,
          ],
        );
    }
  }, []);

  return (
    <>
      {Object.keys(presetTimeRange || {}).map((k) => {
        return (
          <CheckableTag
            key={k}
            checked={k === tag}
            onChange={() => {
              setTag(k);
              if (presetTimeRange) {
                rest.onChange &&
                  rest.onChange(
                    presetTimeRange[k],
                    presetTimeRange[k].map((item) => item.toString()) as [
                      string,
                      string,
                    ],
                  );
              }
            }}
          >
            {k}
          </CheckableTag>
        );
      })}

      <RangePicker
        {...rest}
        onChange={(...args) => {
          rest.onChange && rest.onChange(...args);
          setTag(undefined);
        }}
      ></RangePicker>
    </>
  );
}

export default QuickRangePicker;
