import React, { useState } from 'react';
import { Tag } from 'antd';
import { CheckableTagProps } from 'antd/es/tag';
import 'antd/es/tag/style';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import styles from './index.less';

const { CheckableTag } = Tag;

interface TagSelectorProps {
  /**
   * 标签数组
   */
  tags: { label: string; value: string | number }[];
  /**
   * 当前值
   */
  value?: string[] | string;
  /**
   * 变化回调
   */
  handleOnChange?: (val?: string[] | string) => void;
  /**
   * 标签选择器类型，支持单选或多选。
   */
  type?: 'radio' | 'checkbox';
  /**
   * 指定当选项超过多少个时，提供展开按钮并隐藏剩余选项。
   */
  displayMaxOptionLength?: number;
}
export default function TagSelector({
  tags = [],
  value = [],
  handleOnChange,
  type = 'checkbox',
  displayMaxOptionLength = 20,
  ...rest
}: TagSelectorProps) {
  const [expand, setExpand] = useState(false);

  let tTags = [...tags];

  const handleChange = (tag: string, checked: boolean) => {
    let nextValue: string | string[] | undefined = [];
    if (type === 'radio') {
      nextValue = checked ? tag : undefined;
    } else if (Array.isArray(value)) {
      nextValue = checked
        ? [...value, tag]
        : value.filter((item) => item !== tag);
    }
    handleOnChange && handleOnChange(nextValue as string);
  };

  return (
    <div className={styles['tag-selector']}>
      {tTags
        .filter((_, idx) => (expand ? true : idx + 1 <= displayMaxOptionLength))
        .map(({ label, value: tag }) => (
          <CheckableTag
            {...rest}
            key={tag}
            checked={type === 'radio' ? tag === value : value.includes(tag)}
            onChange={(checked) => {
              handleChange(tag, checked);
            }}
          >
            {label}
          </CheckableTag>
        ))}
      {tTags.length > displayMaxOptionLength ? (
        <a
          style={{
            whiteSpace: 'nowrap',
            paddingLeft: 8,
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
