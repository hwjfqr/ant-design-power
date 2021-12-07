import React, { useState, useEffect, useRef } from 'react';
import { Tag, Input, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { TagProps } from 'antd/es/tag';
import { InputProps } from 'antd/es/input';
import './index.less';

type EditableTagProps = {
  /**
   * 当前值
   */
  value?: string[];
  /**
   * 变化回调
   */
  onChange?: (tags: string[]) => void;
  /**
   * 自定义添加文本
   */
  addTxt?: string;
  /**
   * 用于指定 Tag 组件的其他 API
   */
  tagProps?: TagProps;
  /**
   * 用于指定 Input 组件的其他 API
   */
  inputProps?: InputProps;
};
function EditableTag({ value, onChange, addTxt = '添加' }: EditableTagProps) {
  const [inputArgs, setInputArgs] = useState({ visible: false, value: '' });
  const [editInputArgs, setEditInputArgs] = useState({ index: -1, value: '' });

  const handleInputConfirm = () => {
    const { value: inputValue } = inputArgs;
    let tags = [...(value || [])];
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    onChange && onChange(tags);
    setInputArgs({ visible: false, value: '' });
  };

  const handleEditInputConfirm = () => {
    const tags = [...(value || [])];
    const { index, value: eValue } = editInputArgs;
    tags[index] = eValue;
    onChange && onChange(tags);
    setEditInputArgs({ index: -1, value: '' });
  };

  const editInputRef = useRef<Input>(null);
  useEffect(() => {
    if (editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editInputArgs]);
  const inputRef = useRef<Input>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputArgs]);

  const tags = [...(value || [])];
  return (
    <>
      {tags.map((tag, index) => {
        if (editInputArgs.index === index) {
          return (
            <Input
              ref={editInputRef}
              key={tag}
              size="small"
              className="antd-power-tag-input"
              value={editInputArgs.value}
              onChange={({ target: { value } }) =>
                setEditInputArgs((data) => ({
                  ...data,
                  value,
                }))
              }
              onBlur={handleEditInputConfirm}
              onPressEnter={handleEditInputConfirm}
            />
          );
        }
        const isLongTag = tag.length > 20;
        const tagElem = (
          <Tag
            className="antd-power-edit-tag"
            key={tag}
            closable
            onClose={() => {
              const newTags = tags.filter((item) => item !== tag);
              onChange && onChange(newTags);
            }}
          >
            <span
              onDoubleClick={(e) => {
                e.preventDefault();
                setEditInputArgs({
                  index,
                  value: tag,
                });
              }}
            >
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </span>
          </Tag>
        );
        return isLongTag ? (
          <Tooltip title={tag} key={tag}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        );
      })}
      {inputArgs.visible && (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          className="antd-power-tag-input"
          value={inputArgs.value}
          onChange={({ target: { value } }) => {
            setInputArgs((data) => ({
              ...data,
              value,
            }));
          }}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputArgs.visible && (
        <Tag
          className="antd-power-site-tag-plus"
          onClick={() => {
            setInputArgs((data) => ({
              ...data,
              visible: true,
            }));
          }}
        >
          <PlusOutlined /> {addTxt}
        </Tag>
      )}
    </>
  );
}

export default EditableTag;
