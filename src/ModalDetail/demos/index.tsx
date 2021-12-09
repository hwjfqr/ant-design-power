import React, { ReactNode, useState } from 'react';
import { Button } from 'antd';
import { ModalDetail } from 'ant-design-power';

function ModalDetailDemo() {
  const [listItemDetailArgs, setListItemDetailArgs] = useState<{
    visible: boolean;
    data: { label: string; value?: string | ReactNode }[];
  }>({
    visible: false,
    data: [],
  });

  return (
    <>
      <Button
        onClick={() => {
          setListItemDetailArgs({
            visible: true,
            data: [
              { label: '姓名', value: '张三' },
              { label: '联系电话', value: '13312341234' },
              { label: '用户类型', value: '普通用户' },
            ],
          });
        }}
      >
        查看详情
      </Button>
      <ModalDetail
        title="详情"
        visible={listItemDetailArgs.visible}
        data={listItemDetailArgs.data}
        onClose={() => setListItemDetailArgs({ visible: false, data: [] })}
      ></ModalDetail>
    </>
  );
}

export default ModalDetailDemo;
