import React from 'react';
import { message, Menu } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';
import { EditableTree } from 'ant-design-power';

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
  return (
    <div>
      <EditableTree
        defaultExpandAll
        treeData={treeData}
        treeEditingMethod={{
          addItem(nodeInfo) {
            message.info(`add：${JSON.stringify(nodeInfo)}`);
          },
          editItem(nodeInfo) {
            message.info(`edit：${JSON.stringify(nodeInfo)}`);
          },
          deleteItem(nodeInfo) {
            message.info(`delete：${JSON.stringify(nodeInfo)}`);
          },
        }}
        renderRightClickMenuItem={(menu, nodeInfo, treeEditingMethod) => {
          const [addNode, editNode] = menu;
          return (
            <>
              {addNode}
              {editNode}
              <Menu.Item
                key="delete"
                danger
                icon={<MinusCircleOutlined />}
                onClick={() => {
                  const { deleteItem } = treeEditingMethod;
                  deleteItem && deleteItem(nodeInfo);
                }}
              >
                移除
              </Menu.Item>
              <Menu.Item
                key="custom"
                onClick={() => {
                  message.info(`custom：${JSON.stringify(nodeInfo)}`);
                }}
              >
                自定义菜单项
              </Menu.Item>
            </>
          );
        }}
      ></EditableTree>
    </div>
  );
}

export default EditableTreeDemo;
