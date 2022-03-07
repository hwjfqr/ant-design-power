import React from 'react';
import { Form, Button, message } from 'antd';
import { TagSelector } from 'ant-design-power';

function TagSelectorFormDemo() {
  const options: { label: string; value: string }[] = [];
  Array.from(new Array(100)).forEach((_, idx) => {
    options.push({ label: `选项${idx + 1}`, value: `${idx + 1}` });
  });

  return (
    <Form
      onFinish={(values) => {
        message.info(JSON.stringify(values));
      }}
    >
      <Form.Item label="选项" name="option">
        <TagSelector tags={options}></TagSelector>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
}

export default TagSelectorFormDemo;
