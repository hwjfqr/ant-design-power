import React, { ReactNode } from 'react';
import { Modal, Descriptions } from 'antd';
import { ModalProps } from 'antd/es/modal';
import { DescriptionsProps } from 'antd/es/descriptions';

interface DetailModalType {
  /**
   * 标题
   */
  title: string;
  /**
   * 是否可见
   */
  visible: boolean;
  /**
   * 关闭模态框时触发的事件
   */
  onClose: () => void;
  /**
   * 需要展示的详情数据
   */
  data?: { label: string; value?: ReactNode | string }[];
  /**
   * 用于指定 Modal 组件的其他 API
   */
  modalProps?: ModalProps;
  /**
   * 用于指定 Descriptions 组件的其他 API
   */
  descriptionsProps?: DescriptionsProps;
  children?: ReactNode;
}
function ModalDetail({
  title = '详情',
  visible = false,
  onClose,
  data,
  children,
  modalProps,
  descriptionsProps,
}: DetailModalType) {
  return (
    <Modal
      title={title}
      visible={visible}
      forceRender
      okText="确定"
      onCancel={() => {
        onClose();
      }}
      onOk={() => {
        onClose();
      }}
      footer={null}
      {...modalProps}
    >
      {data && data.length ? (
        <Descriptions bordered column={1} {...descriptionsProps}>
          {data.map(({ label, value }) => (
            <Descriptions.Item label={label || '-'} key={label}>
              {value || '-'}
            </Descriptions.Item>
          ))}
        </Descriptions>
      ) : null}
      {children || null}
    </Modal>
  );
}

export default ModalDetail;
