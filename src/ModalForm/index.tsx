import React, { ReactNode, useEffect } from 'react';
import { Modal, Form } from 'antd';
import { ModalProps } from 'antd/es/modal';
import { FormProps, FormInstance } from 'antd/es/form';

export interface ModalFormType<T> {
  /**
   * 标题。
   */
  title?: string;
  /**
   * 是否可见。
   */
  visible: boolean;
  /**
   * 初始值。
   */
  initialValue?: T;
  /**
   * 修改状态时，id 的字段名称。
   */
  idKey?: string;
  /**
   * Modal 关闭时触发回调。
   */
  onClose: () => void;
  /**
   * 点击提交按钮时触发的回调，当回调返回值为 true 时，将触发 onClose 方法关闭 Modal。
   */
  onSubmit: (values: T, isEdit: boolean) => Promise<boolean>;
  /**
   * 当表单值变化时触发的回调，用于实现表单值联动变化。
   */
  onValuesChange?: (
    // value: GetSingleValueType<T>,
    value: { [prop: string]: any },
    allValue: T,
    form: FormInstance<T>,
  ) => void;
  /**
   * 用于指定 Modal 组件相关 API 。
   */
  modalProps?: ModalProps;
  /**
   * 用于指定 Form 组件相关 API 。
   */
  formProps?: FormProps;
  children?: ReactNode;
}
function ModalForm<T extends { [prop: string]: unknown }>({
  title = '表单',
  visible = false,
  initialValue,
  onClose,
  idKey = 'id',
  onSubmit,
  onValuesChange,
  modalProps,
  formProps,
  children,
}: ModalFormType<T>) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (Object.keys(initialValue || {}).length) {
      form.setFieldsValue(initialValue);
    }
  }, [initialValue]);

  return (
    <Modal
      title={visible ? title : '-'}
      visible={visible}
      forceRender
      keyboard={false}
      maskClosable={false}
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
          const data = { ...values };
          if (initialValue && initialValue[idKey])
            data[idKey] = initialValue[idKey];
          const b = await onSubmit(
            data,
            !!(initialValue && initialValue[idKey]),
          );
          if (b) {
            onClose();
            setTimeout(() => form.resetFields(), 300);
          }
        } catch (err) {
          console.error('验证失败', err);
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
