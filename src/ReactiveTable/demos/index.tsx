import React, { useState } from 'react';
import { Button, Tag, Space } from 'antd';
import { ReactiveTable } from 'ant-design-power';

const dataSource = [...new Array(100)].map((_, index) => ({
  id: index + 1,
  username: `用户${index + 1}`,
  type: '管理员',
  status: 1,
}));

function ReactiveTableDemo() {
  const [displayType, setDisplayType] = useState<'table' | 'list'>('table');
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
      <div style={{ paddingTop: 10 }}>
        <ReactiveTable
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
            pagination: {},
          }}
        ></ReactiveTable>
      </div>
    </div>
  );
}

export default ReactiveTableDemo;
