import React, { useState } from 'react';
import { Form, Input, Modal } from 'antd';
import { EditableTree, ModalForm } from 'ant-design-power';
import { DataNodeType } from '..';

const data = [
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
  const [treeData, setTreeData] = useState<DataNodeType[]>(data);
  const [modalArgs, setModalArgs] = useState<{
    visible: boolean;
    data?: {
      id?: string;
      title?: string;
      parentId?: string;
    };
  }>({
    visible: false,
  });

  return (
    <div>
      <EditableTree
        defaultExpandAll
        treeData={treeData}
        treeEditingMethod={{
          addItem(nodeInfo) {
            const { key } = nodeInfo;
            setModalArgs({
              visible: true,
              data: {
                parentId: key as string,
              },
            });
          },
          editItem(nodeInfo) {
            const { key, title } = nodeInfo;
            setModalArgs({
              visible: true,
              data: {
                id: key as string,
                title: title as string,
              },
            });
          },
          deleteItem(nodeInfo) {
            const { key, title } = nodeInfo;
            Modal.confirm({
              title: '删除',
              content: `确定删除 ${title} 吗？`,
              onOk() {
                const data = EditableTree.deleteTreeNode(treeData, key);
                setTreeData(data);
              },
            });
          },
        }}
      ></EditableTree>
      <ModalForm
        title={modalArgs.data ? '修改' : '添加'}
        visible={modalArgs.visible}
        initialValue={modalArgs.data}
        onClose={() => {
          setModalArgs({ visible: false, data: {} });
        }}
        onSubmit={async (values, isEdit) => {
          if (isEdit) {
            const data = EditableTree.updateTreeNode(
              treeData,
              values.id!,
              (node) => {
                return {
                  ...node,
                  title: values.title,
                };
              },
            );
            setTreeData(data);
          } else {
            const data = EditableTree.updateTreeNode(
              treeData,
              modalArgs.data?.parentId!,
              (node) => {
                const val = {
                  title: values.title,
                  key: `${node.key}-${(node.children || []).length}`,
                };
                return {
                  ...node,
                  children: (node.children || []).length
                    ? [...node.children!, val]
                    : [val],
                };
              },
            );
            setTreeData(data);
          }
          return true;
        }}
      >
        <Form.Item label="名称" name="title">
          <Input></Input>
        </Form.Item>
      </ModalForm>
    </div>
  );
}

export default EditableTreeDemo;
