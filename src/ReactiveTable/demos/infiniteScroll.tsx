import React, { useState, useEffect } from 'react';
import { Button, Tag, Space } from 'antd';
import { ReactiveTable } from 'ant-design-power';

type DataSourceType = {
  id: number;
  username: string;
  type: string;
  status: number;
}[];
const dataSource: DataSourceType = [...new Array(100)].map((_, index) => ({
  id: index + 1,
  username: `用户${index + 1}`,
  type: '管理员',
  status: 1,
}));
function getDataSource(page: number, pageSize: number = 10) {
  return dataSource.slice((page - 1) * pageSize, page * pageSize);
}

function InfiniteScrollDemo() {
  const [displayType, setDisplayType] = useState<'table' | 'list'>('list');
  useEffect(() => {
    setPage(1);
  }, [displayType]);

  const [list, setList] = useState<DataSourceType>([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    const data = getDataSource(page);
    if (displayType === 'list') {
      if (list.length && page === 1) {
        setList(data);
        const scrollableDivElm = document.getElementById('scrollableDiv');
        if (scrollableDivElm) {
          scrollableDivElm.scrollTop = 0;
        }
      } else {
        setList((d) => [...d, ...data]);
      }
    } else {
      setList(data);
    }
  }, [page]);

  return (
    <div>
      <Space>
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
        <Button
          onClick={() => {
            setPage(1);
          }}
        >
          重置
        </Button>
      </Space>
      <div style={{ paddingTop: 10 }}>
        <ReactiveTable
          type={displayType}
          infiniteScroll={{
            dataLength: list.length,
            next: () => {
              setPage((p) => p + 1);
            },
            hasMore: list.length < dataSource.length,
            loader: <div style={{ textAlign: 'center' }}>加载中...</div>,
            endMessage: <div style={{ textAlign: 'center' }}>加载完毕</div>,
          }}
          scrollableDivHeight="calc(100vh - 92px - 22px)"
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
            dataSource: list,
          }}
          tableProps={{
            pagination: {
              total: dataSource.length,
              current: page,
              defaultPageSize: 10,
              showSizeChanger: false,
              onChange: (page) => {
                setPage(page);
              },
            },
          }}
        ></ReactiveTable>
      </div>
    </div>
  );
}

export default InfiniteScrollDemo;
