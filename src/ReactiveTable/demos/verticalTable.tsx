import React from 'react';
import { ReactiveTable } from 'ant-design-power';

const data = [
  {
    id: '1',
    net_profit_parent: '1.14亿',
    net_profit_parent_gr: '-0.523%',
    non_net_profit_deduction: '7807.03万',
    non_net_profit_deduction_gr: '-13.86%',
    total_operating_income: '94.44亿',
    total_operating_income_gr: '28.70%',
    date: '2022-03-31',
  },
  {
    id: '2',
    net_profit_parent: '1.14亿',
    net_profit_parent_gr: '-0.523%',
    non_net_profit_deduction: '7807.03万',
    non_net_profit_deduction_gr: '-13.86%',
    total_operating_income: '94.44亿',
    total_operating_income_gr: '28.70%',
    date: '2021-12-31',
  },
  {
    id: '3',
    net_profit_parent: '1.14亿',
    net_profit_parent_gr: '-0.523%',
    non_net_profit_deduction: '7807.03万',
    non_net_profit_deduction_gr: '-13.86%',
    total_operating_income: '94.44亿',
    total_operating_income_gr: '28.70%',
    date: '2021-09-30',
  },
  {
    id: '4',
    net_profit_parent: '1.14亿',
    net_profit_parent_gr: '-0.523%',
    non_net_profit_deduction: '7807.03万',
    non_net_profit_deduction_gr: '-13.86%',
    total_operating_income: '94.44亿',
    total_operating_income_gr: '28.70%',
    date: '2021-06-30',
  },
];

function VerticalTableDemo() {
  return (
    <div>
      <div style={{ paddingTop: 10 }}>
        <ReactiveTable
          type="table"
          verticalTableLayoutConf={{
            mainFieldName: 'date',
            firstCellName: '科目/年度',
          }}
          fields={[
            {
              title: '日期',
              dataIndex: 'date',
              render: (text) => text || '-',
              type: 'title',
            },
            {
              title: '归母净利润(元)',
              dataIndex: 'net_profit_parent',
            },
            {
              title: '归母净利润同比增长率',
              dataIndex: 'net_profit_parent_gr',
            },
            {
              title: '扣非净利润(元)',
              dataIndex: 'non_net_profit_deduction',
            },
            {
              title: '扣非净利润同比增长率',
              dataIndex: 'non_net_profit_deduction_gr',
            },
            {
              title: '营业总收入(元)',
              dataIndex: 'total_operating_income',
            },
            {
              title: '营业总收入同比增长率',
              dataIndex: 'total_operating_income_gr',
            },
          ]}
          commonProps={{
            dataSource: data,
            rowKey: 'id',
          }}
          tableProps={{
            scroll: { x: 'max-content' },
            pagination: false,
          }}
        ></ReactiveTable>
      </div>
    </div>
  );
}

export default VerticalTableDemo;
