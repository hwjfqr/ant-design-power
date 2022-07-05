import React, { Fragment, ReactNode } from 'react';
import { Table, List, Space } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Props as InfiniteScrollProps } from 'react-infinite-scroll-component/dist/index';
import type { TableProps, ColumnType } from 'antd/es/table/index';
import type { ListProps } from 'antd/es/list/index';
import './index.less';

type FieldsType<T> = (ColumnType<T> & { [prop: string]: any })[];

function getField<T extends { [prop: string]: any }>(
  fields: FieldsType<T>,
  record: T,
) {
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

interface ReactiveTableProps<T extends { [prop: string]: any }> {
  /**
   * 展示类型
   */
  type: 'table' | 'list';
  /**
   * 展示字段，规则与 Table 组件的 columns 字段一致。
   * 增加了 type 字段用于标识字段类型，便于在 List 组件展示相关字段，其值如下：
   * title - 标题字段；info - 信息字段；action - 操作字段。
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
   * 用于启用纵向表格的相关配置（具体用法详见 Demo）：
   * mainFieldName：指定主字段的名称；
   * firstCellName：指定表格左上角单元格的名称。
   */
  verticalTableLayoutConf?: {
    mainFieldName: string;
    firstCellName: string;
  };
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

function ListComponent<T extends { [prop: string]: any }>({
  fields,
  commonProps,
  listProps,
}: Omit<ReactiveTableProps<T>, 'type'>) {
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

function ReactiveTable<T extends { [prop: string]: any }>({
  type = 'table',
  fields,
  commonProps = {},
  tableProps = {},
  verticalTableLayoutConf,
  listProps = {},
  infiniteScroll,
  scrollableDivHeight = '90vh',
}: ReactiveTableProps<T>) {
  if (verticalTableLayoutConf && type === 'table') {
    const { mainFieldName, firstCellName } = verticalTableLayoutConf;
    const verticalTableLayoutFields: FieldsType<T> = [];
    const verticalTableLayoutDataSource: T[] = [];
    const data = [...(commonProps.dataSource || [])];
    let mainField: (ColumnType<T> & { [prop: string]: any }) | undefined =
      undefined;
    const cols = [...fields].filter((item) => {
      const k = (item.dataIndex || item.key) as string;
      if (k === mainFieldName) {
        mainField = item;
        return false;
      }
      return true;
    });
    if (mainField === undefined) {
      mainField = cols.shift();
    }
    const mainKey = (mainField?.dataIndex || mainField?.key) as string;
    if (mainKey) {
      /**
       * 列的数量就是 data 的长度
       */
      data.forEach((item, idx) => {
        const val = item[mainKey];
        verticalTableLayoutFields.push({
          title: mainField?.render ? mainField.render(val, item, idx) : val,
          dataIndex: val,
        });
      });
    }
    /**
     * 每条数据的成员都是同一类型，成员数量就是 verticalTableLayoutFields 的数量（同样也是 data 的数量）。
     * 数据条数就是 cols 的长度。
     */
    cols.forEach((col, i) => {
      const dataItem: { [prop: string]: any } = {};
      const key = (col.dataIndex || col.key) as string;
      for (let idx = 0; idx < verticalTableLayoutFields.length; idx++) {
        const vField = verticalTableLayoutFields[idx];
        const vKey = (vField.dataIndex || vField.key) as string;
        const dItem = data[idx];
        const val = col.render
          ? col.render(dItem[key], dItem, idx)
          : dItem[key];
        dataItem[vKey] = val;
      }
      verticalTableLayoutDataSource.push({
        ...dataItem,
        [firstCellName]: col.title,
        idx: i,
      } as any);
    });
    verticalTableLayoutFields.unshift({
      title: firstCellName,
      dataIndex: firstCellName,
    });

    return (
      <Table
        {...commonProps}
        {...tableProps}
        columns={verticalTableLayoutFields}
        dataSource={verticalTableLayoutDataSource}
        rowKey="idx"
      ></Table>
    );
  }

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

export default ReactiveTable;
