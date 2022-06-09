import React, { useState } from 'react';
import { Button, Tag, Space } from 'antd';
import { TableList } from 'ant-design-power';

const dataSource = [
  {
    id: '1',
    username: '用户1',
    type: '普通用户',
    status: 1,
  },
  {
    id: '2',
    username: '用户2',
    type: '普通用户',
    status: 0,
  },
  {
    id: '3',
    username: '用户3',
    type: '管理员',
    status: 1,
  },
];

function TableListDemo() {
  const [displayType, setDisplayType] = useState<'table' | 'list'>('list');
  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setDisplayType((d) => {
            if (d === 'list') return 'table';
            return 'list';
          });
        }}
      >
        切换显示模式
      </Button>
      <div style={{ paddingBottom: 10 }}>
        <TableList
          type={displayType}
          fields={[
            {
              title: '用户名',
              dataIndex: 'username',
              type: 'title',
            },
            {
              title: '类型',
              dataIndex: 'type',
            },
            {
              title: '状态',
              dataIndex: 'status',
              render: (status) =>
                status === 1 ? (
                  <Tag color="green">启用</Tag>
                ) : (
                  <Tag color="red">禁用</Tag>
                ),
            },
            {
              title: '操作',
              dataIndex: 'action',
              type: 'action',
              render: () => (
                <Space>
                  <a>修改</a>
                </Space>
              ),
            },
          ]}
          commonProps={{
            rowKey: 'id',
            dataSource,
          }}
        ></TableList>
      </div>
    </div>
  );
}

export default TableListDemo;
