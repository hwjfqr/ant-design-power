import React, { useState } from 'react';
import { Tag } from 'antd';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import { CheckableTagProps } from 'antd/es/tag';
import 'antd/es/tag/style';
import styles from './index.less';

const { CheckableTag } = Tag;

type ValueType = (string | number)[] | string | number | undefined;
interface TagSelectorProps
  extends Omit<CheckableTagProps, 'checked' | 'onChange'> {
  /**
   * 标签数组
   */
  tags: { label: string; value: string | number }[];
  /**
   * 当前值
   */
  value?: ValueType;
  /**
   * 变化回调
   */
  onChange(val?: string): void;
  onChange(val?: number): void;
  onChange(val?: (string | number)[]): void;
  onChange(val: ValueType): void;
  /**
   * 标签选择器类型，支持单选或多选。
   */
  type?: 'radio' | 'checkbox';
  /**
   * 指定当选项超过多少个时，提供展开按钮并隐藏剩余选项。指定为 false ，表示不隐藏选项。
   */
  displayMaxOptionLength?: number | boolean;
}
export default function TagSelector({
  tags = [],
  value = [],
  onChange,
  type = 'checkbox',
  displayMaxOptionLength = 20,
  ...rest
}: TagSelectorProps) {
  const [expand, setExpand] = useState(false);

  let tTags = [...tags];

  const handleChange = (tag: string | number, checked: boolean) => {
    let nextValue: ValueType = [];
    if (type === 'radio') {
      nextValue = checked ? tag : undefined;
    } else if (Array.isArray(value)) {
      nextValue = checked
        ? [...value, tag]
        : value.filter((item) => item !== tag);
    }
    onChange && onChange(nextValue);
  };

  return (
    <div style={{ position: 'relative', display: 'flex' }}>
      <div className={styles['tag-selector']}>
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
                  : (value as (string | number)[]).includes(tag)
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
          style={{ flexBasis: 50, flexShrink: 0, paddingTop: 4 }}
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
