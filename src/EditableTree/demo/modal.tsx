import React, { useState } from 'react';
import { message, Form, Input, Modal } from 'antd';
import { EditableTree, ModalForm } from 'ant-design-power';

const treeData = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
          },
          {
            title: 'leaf',
            key: '0-0-0-1',
          },
        ],
      },
    ],
  },
];

function EditableTreeDemo() {
  const [modalArgs, setModalArgs] = useState({
    visible: false,
    data: {},
  });

  return (
    <div>
      <EditableTree
        defaultExpandAll
        treeData={treeData}
        treeEditingMethod={{
          addItem(nodeInfo) {
            setModalArgs({ visible: true, data: {} });
          },
          editItem(nodeInfo) {
            const { title } = nodeInfo;
            setModalArgs({
              visible: true,
              data: {
                name: title,
              },
            });
          },
          deleteItem(nodeInfo) {
            const { title } = nodeInfo;
            Modal.confirm({
              title: '删除',
              content: `确定删除 ${title} 吗？`,
              onOk() {
                // 删除逻辑...
              },
            });
          },
        }}
      ></EditableTree>
      <ModalForm
        title={Object.keys(modalArgs.data).length ? '修改' : '添加'}
        visible={modalArgs.visible}
        initialValue={modalArgs.data}
        onClose={() => {
          setModalArgs({ visible: false, data: {} });
        }}
        onSubmit={async (data) => {
          message.info(JSON.stringify(data));
          return true;
        }}
      >
        <Form.Item label="名称" name="name">
          <Input></Input>
        </Form.Item>
      </ModalForm>
    </div>
  );
}

export default EditableTreeDemo;
