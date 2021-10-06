import React, { useState } from 'react';
import { Card } from 'antd';
import { Leaderboard } from 'ant-design-power';

function LeaderboardDemo() {
  const data: { label: string; value: string | number }[] = [];
  Array.from(new Array(10)).forEach((_, idx) => {
    data.push({
      label: `项目项目项目项目项目项目项目项目项目项目项目项目项目项目项目项目项目项目 ${
        idx + 1
      }`,
      value: `项目项目项目项目项目项目项目项目项目项目项目项目项目项目项目项目项目项目 ${
        idx + 1
      }`,
    });
  });

  return <Leaderboard data={data} />;
}

export default LeaderboardDemo;
