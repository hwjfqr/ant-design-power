import React from 'react';
import { Tooltip } from 'antd';
import styles from './index.less';

/* 
  普通颜色
  高亮颜色
  高亮个数
  额外元素
*/
interface LeaderboardProps {
  data: { label: string; value: string | number }[];
  highlightNumber: number;
}
function Leaderboard({ data, highlightNumber = 3 }: LeaderboardProps) {
  return (
    <div className={styles['rank-list']}>
      {data.length ? (
        <ul>
          {data.map(({ label, value }, index) => (
            <li key={label}>
              <div
                className={`${styles.rank} ${
                  index + 1 <= highlightNumber
                    ? styles['highlight-color']
                    : styles['normal-color']
                }`}
              >
                {index + 1}
              </div>
              <div className={styles.name}>
                <span title={label || '--'}>{label || '--'}</span>
              </div>
              <div className={styles.num}>{value}</div>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.empty}>暂无数据</div>
      )}
    </div>
  );
}

export default Leaderboard;
