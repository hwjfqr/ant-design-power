import React, { useState } from 'react';
import { Tag } from 'antd';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import { CheckableTagProps } from 'antd/es/tag';
import './index.less';

const { CheckableTag } = Tag;

type ValueType = any;
interface TagSelectorProps<T>
  extends Omit<CheckableTagProps, 'checked' | 'onChange'> {
  /**
   * 标签数组
   */
  tags: { label: string; value: ValueType }[];
  /**
   * 当前值
   */
  value?: T;
  /**
   * 变化回调
   */
  onChange?(val: T): void;
  /**
   * 标签选择器类型，支持单选或多选。
   */
  type?: 'radio' | 'checkbox';
  /**
   * 指定当选项超过多少个时，提供展开按钮并隐藏剩余选项。指定为 false ，表示不隐藏选项。
   */
  displayMaxOptionLength?: number | boolean;
  /**
   * 指定是否添加“全部”选项
   */
  showAll?: boolean;
  /**
   * 全部选项的文案
   */
  allText?: string;
  /**
   * 全部选项的值
   */
  allValue?: string;
}
export default function TagSelector<T extends ValueType | ValueType[]>({
  tags = [],
  value,
  onChange,
  type = 'checkbox',
  displayMaxOptionLength = 20,
  showAll = false,
  allText = '全部',
  allValue = 'all',
  ...rest
}: TagSelectorProps<T>) {
  const [expand, setExpand] = useState(false);

  let tTags = [...tags];
  if (showAll) {
    tTags = [{ label: allText, value: allValue }, ...tTags];
  }

  const handleChange = (tag: ValueType, checked: boolean) => {
    let nextValue: any;
    if (type === 'radio') {
      nextValue = checked ? tag : showAll ? allValue : undefined;
    } else if (type === 'checkbox') {
      const val = [...((value as ValueType[]) || [])];
      const filteredVal = val.filter((item) => item !== tag);
      if (showAll) {
        if (tag === allValue) {
          nextValue = [allValue];
        } else if (checked) {
          nextValue = [...val.filter((item) => item !== allValue), tag];
        } else {
          nextValue = filteredVal.length ? filteredVal : [allValue];
        }
      } else {
        if (checked) {
          nextValue = [...val, tag];
        } else {
          nextValue = filteredVal.length ? filteredVal : undefined;
        }
      }
    }
    onChange && onChange(nextValue);
  };

  return (
    <div style={{ position: 'relative', display: 'flex' }}>
      <div className="antd-power-tag-selector">
        {tTags
          .filter(
            (_, idx) =>
              expand ||
              (displayMaxOptionLength && idx + 1 <= displayMaxOptionLength) ||
              !displayMaxOptionLength,
          )
          .map(({ label, value: tag }) => (
            <CheckableTag
              {...rest}
              key={tag}
              checked={
                type === 'radio'
                  ? tag === value
                  : ((value as ValueType[]) || []).includes(tag)
              }
              onChange={(checked) => {
                handleChange(tag, checked);
              }}
            >
              {label}
            </CheckableTag>
          ))}
        {displayMaxOptionLength &&
        tTags.length > displayMaxOptionLength &&
        expand === false ? (
          <span>......</span>
        ) : null}
      </div>
      {displayMaxOptionLength && tTags.length > displayMaxOptionLength ? (
        <a
          style={{
            marginLeft: 8,
            marginTop: 4,
            minWidth: 50,
          }}
          onClick={() => {
            setExpand(!expand);
          }}
        >
          {expand ? (
            <span>
              收起
              <UpOutlined style={{ marginLeft: 4 }} />
            </span>
          ) : (
            <span>
              展开
              <DownOutlined style={{ marginLeft: 4 }} />
            </span>
          )}
        </a>
      ) : null}
    </div>
  );
}
