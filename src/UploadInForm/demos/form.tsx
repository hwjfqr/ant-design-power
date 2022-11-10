import React, { useState } from 'react';
import { Button, Space, Form, Input, message } from 'antd';
import { ModalForm, UploadInForm } from 'ant-design-power';

function UploadInFormDemo() {
  type DataType = {
    name?: string;
    attachments?: { name: string; url: string }[];
  };
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
              data: {
                name: '张三',
                attachments: [
                  {
                    name: '附件1',
                    url: 'https://www.runoob.com/images/pulpit.jpg',
                  },
                ],
              },
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
          console.log(values);
          message.info(`${JSON.stringify(values)} ${isEdit}`);
          return true;
        }}
      >
        <Form.Item label="姓名" name="name">
          <Input></Input>
        </Form.Item>
        <Form.Item label="附件" name="attachments">
          <UploadInForm
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            multiple
            transform={(fileList, info) => {
              console.log('transform 执行', info.file);
              const result = fileList.map((item) => {
                const { response, ...rest } = item;
                if (response) {
                  // 处理响应，获取结果。
                  const { url } = response;
                  return {
                    url,
                    ...rest,
                  };
                }
                return item;
              });
              return result;
            }}
          ></UploadInForm>
        </Form.Item>
      </ModalForm>
    </div>
  );
}

export default UploadInFormDemo;
