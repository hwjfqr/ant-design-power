import React, { ReactNode, useEffect } from 'react';
import { Modal, Form } from 'antd';
import { ModalProps } from 'antd/es/modal';
import { FormProps, FormInstance } from 'antd/es/form';

export interface ModalFormType {
  title: string;
  visible: boolean;
  initialValue?: { [prop: string]: unknown };
  onClose: () => void;
  onSubmit: (values: { [props: string]: unknown }, id?: string) => Promise<any>;
  onValuesChange?: (
    value: { [prop: string]: string | unknown },
    allValue: { [prop: string]: string | unknown }[],
    form: FormInstance<any>,
  ) => void;
  modalProps?: ModalProps;
  formProps?: FormProps;
  children?: ReactNode;
}
function ModalForm({
  title,
  visible,
  initialValue = {},
  onClose,
  onSubmit,
  onValuesChange,
  modalProps,
  formProps,
  children,
}: ModalFormType) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (Object.keys(initialValue).length) {
      form.setFieldsValue(initialValue);
    }
  }, [initialValue]);

  return (
    <Modal
      title={title || '表单'}
      visible={visible}
      forceRender
      okText="提交"
      onCancel={() => {
        onClose();
        setTimeout(() => {
          form.resetFields();
        }, 300);
      }}
      onOk={async () => {
        try {
          const values = await form.validateFields();
          await onSubmit(values, initialValue.id as string | undefined);
          onClose();
          setTimeout(() => form.resetFields(), 300);
        } catch (err) {
          console.log('验证失败', err);
        }
      }}
      {...modalProps}
    >
      <Form
        form={form}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 16 }}
        onValuesChange={(...rest) => {
          onValuesChange && onValuesChange(...rest, form);
        }}
        {...formProps}
      >
        {children}
      </Form>
    </Modal>
  );
}

export default ModalForm;
