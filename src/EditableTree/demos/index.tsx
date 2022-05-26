import React from 'react';
import { message } from 'antd';
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
      ></EditableTree>
    </div>
  );
}

export default EditableTreeDemo;
