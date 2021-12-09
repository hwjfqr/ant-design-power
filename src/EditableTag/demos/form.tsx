import React, { useState } from 'react';
import { Form, Button, message } from 'antd';
import { EditableTag } from 'ant-design-power';

function EditableTagFormDemo() {
  return (
    <div>
      <Form
        onFinish={(values) => {
          console.log(values);
          message.info(JSON.stringify(values));
        }}
      >
        <Form.Item label="标签" name="tag" initialValue={['北京']}>
          <EditableTag></EditableTag>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default EditableTagFormDemo;
