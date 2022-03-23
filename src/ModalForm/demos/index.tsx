import React, { useState } from 'react';
import { Button, Space, Form, Input, Select, InputNumber, message } from 'antd';
import { ModalForm } from 'ant-design-power';

const { Option } = Select;

function ModalFormDemo() {
  type DataType = { id?: string; name?: string; gender?: string; age?: number };
  const [dataFormArgs, setDataFormArgs] = useState<{
    visible: boolean;
    data: DataType;
  }>({
    visible: false,
    data: {},
  });

  return (
    <div>
      <Space>
        <Button
          type="primary"
          onClick={() => {
            setDataFormArgs({
              visible: true,
              data: {},
            });
          }}
        >
          添加
        </Button>
        <Button
          onClick={() => {
            setDataFormArgs({
              visible: true,
              data: { id: '1', name: '张三', gender: '男', age: 25 },
            });
          }}
        >
          修改
        </Button>
      </Space>

      <ModalForm<DataType>
        title={Object.keys(dataFormArgs.data).length ? '修改' : '添加'}
        visible={dataFormArgs.visible}
        initialValue={dataFormArgs.data}
        onClose={() => {
          setDataFormArgs({ visible: false, data: {} });
        }}
        onSubmit={async (values, isEdit) => {
          message.info(`${JSON.stringify(values)} ${isEdit}`);
          return true;
        }}
        onValuesChange={(value, _, form) => {
          console.log(value, _, form);
          if (value.gender && value.gender === '男') {
            form.setFieldsValue({ age: 20 });
          }
        }}
      >
        <Form.Item
          label="姓名"
          name="name"
          rules={[{ required: true, message: '请输入' }]}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item label="性别" name="gender">
          <Select>
            {['男', '女'].map((item) => (
              <Option value={item} key={item}>
                {item}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="年龄" name="age">
          <InputNumber min={0} max={100} />
        </Form.Item>
      </ModalForm>
    </div>
  );
}

export default ModalFormDemo;
