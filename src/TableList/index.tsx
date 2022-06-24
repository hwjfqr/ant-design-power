import React, { Fragment, ReactNode } from 'react';
import { Table, List, Space } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Props as InfiniteScrollProps } from 'react-infinite-scroll-component/dist/index';
import type { TableProps, ColumnType } from 'antd/es/table/index';
import type { ListProps } from 'antd/es/list/index';
import './index.less';

type FieldsType<T> = (ColumnType<T> & { [prop: string]: any })[];

function getField<T extends object>(fields: FieldsType<T>, record: T) {
  const titles: ReactNode[] = [];
  const infos: ReactNode[] = [];
  const actions: ReactNode[] = [];

  fields.forEach(({ type, dataIndex, key, render }, idx) => {
    const k = (dataIndex || key) as string;
    const value = (record as { [prop: string]: any })[k];
    const field = render ? render(value, record, idx) : value;

    if (type === 'title') {
      titles.push(field);
    } else if (type === 'action') {
      actions.push(field);
    } else {
      infos.push(field);
    }
  });

  return {
    titles,
    infos,
    actions,
  };
}

interface TableListProps<T extends object> {
  /**
   * 展示类型
   */
  type: 'table' | 'list';
  /**
   * 展示字段，规则与 Table 组件的 columns 字段一致。增加了 type 字段用于标识字段类型，便于在 List 组件展示相关字段，其值如下：title - 标题字段；info - 信息字段；action - 操作字段。
   */
  fields: FieldsType<T>;
  /**
   * Table 与 List 组件的公共字段（rowKey、dataSource、size、loading、pagination 等）
   */
  commonProps: TableProps<T> & ListProps<T>;
  /**
   * Table 组件的其他 API
   */
  tableProps?: TableProps<T>;
  /**
   * List 组件的其他 API
   */
  listProps?: ListProps<T>;
  /**
   * 使用 List 组件时，滚动加载配置（https://github.com/ankeetmaini/react-infinite-scroll-component）。
   */
  infiniteScroll?: Omit<InfiniteScrollProps, 'children'>;
  /**
   * 开启无限滚动时，容器的高度。
   */
  scrollableDivHeight?: number | string;
}

function ListComponent<T extends object>({
  fields,
  commonProps,
  listProps,
}: Omit<TableListProps<T>, 'type'>) {
  return (
    <List
      key="list"
      {...commonProps}
      itemLayout="vertical"
      {...listProps}
      renderItem={(item) => {
        const { titles, infos, actions } = getField<T>(fields, item);
        return (
          <List.Item actions={actions}>
            <List.Item.Meta
              title={titles.map((item, idx) => (
                <Fragment key={idx}>{item}</Fragment>
              ))}
              description={
                infos.length ? (
                  <Space>
                    {infos.map((item, idx) => (
                      <Fragment key={idx}>{item}</Fragment>
                    ))}
                  </Space>
                ) : null
              }
            ></List.Item.Meta>
          </List.Item>
        );
      }}
    ></List>
  );
}

function TableList<T extends object>({
  type = 'table',
  fields,
  commonProps,
  tableProps = {},
  listProps = {},
  infiniteScroll,
  scrollableDivHeight = '90vh',
}: TableListProps<T>) {
  return (
    <div>
      {type === 'table' ? (
        <Table {...commonProps} {...tableProps} columns={fields}></Table>
      ) : infiniteScroll ? (
        <div
          id="scrollableDiv"
          style={{
            height:
              typeof scrollableDivHeight === 'number'
                ? `${scrollableDivHeight}px`
                : scrollableDivHeight,
            overflow: 'auto',
          }}
        >
          <InfiniteScroll scrollableTarget="scrollableDiv" {...infiniteScroll}>
            <ListComponent
              fields={fields}
              commonProps={commonProps}
              listProps={listProps}
            ></ListComponent>
          </InfiniteScroll>
        </div>
      ) : (
        <ListComponent
          fields={fields}
          commonProps={commonProps}
          listProps={listProps}
        ></ListComponent>
      )}
    </div>
  );
}

export default TableList;
