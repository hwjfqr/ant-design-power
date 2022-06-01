import React, { useState, useEffect, ReactNode } from 'react';
import { Progress } from 'antd';
import { ProgressProps } from 'antd/es/progress';
import './index.less';

interface ProgressLoadingProps {
  /**
   * 是否处于加载中状态
   */
  loading: boolean;
  /**
   * 进度条的加载预估时长（单位：秒），适用于伪进度条的场景。
   */
  duration?: number;
  /**
   * 步长
   */
  step?: number;
  /**
   * 进度
   */
  progress?: number;
  /**
   * 是否全屏显示
   */
  isFull?: boolean;
  /**
   * 全屏遮罩的 z-index 值
   */
  zIndex?: number;
  /**
   * 全屏加载提示内容
   */
  tip?: string | ReactNode;
  /**
   * 指定 Progress 组件相关 API 。
   */
  progressProps?: ProgressProps;
}
function ProgressLoading({
  loading,
  duration,
  step = 0.1,
  progress,
  isFull = true,
  zIndex = 1000,
  tip = '加载中...',
  progressProps,
}: ProgressLoadingProps) {
  const [percent, setPercent] = useState<number>(0);
  const [finish, setFinish] = useState<0 | 1 | 2>(0); // 0-初始状态 1-加载中 2-加载结束

  useEffect(() => {
    if (typeof progress !== 'number') return;
    setPercent(progress);
  }, [progress]);

  useEffect(() => {
    if (!duration || typeof progress === 'number') return;

    if (percent >= 1) {
      setFinish((val) => (val === 0 ? 1 : val));
    }

    const intervalTime = (step * duration * 1000) / 100;
    const timer = setTimeout(() => {
      setPercent((d) => {
        return Number((d + step).toFixed(1));
      });
    }, intervalTime);

    if (!loading || percent >= 99) {
      clearTimeout(timer);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [duration, progress, percent, loading]);

  const displayPercent =
    percent && loading === false ? 100 : Number(percent.toFixed(0));
  useEffect(() => {
    if (displayPercent === 100) {
      setTimeout(() => {
        setFinish((val) => (val === 1 ? 2 : val));
      }, 200);
    }
  }, [displayPercent]);

  useEffect(() => {
    if (finish === 2) {
      // 加载结束后，将相关状态置为初始值。
      setFinish(0);
      setPercent(0);
    }
  }, [finish]);

  console.log(finish);

  return loading || finish === 1 ? (
    <div
      className={`progress-loading ${isFull ? 'mask' : ''}`}
      style={{ zIndex }}
    >
      <div>
        {tip && isFull ? <div style={{ paddingBottom: 8 }}>{tip}</div> : null}
        <Progress percent={displayPercent} {...progressProps}></Progress>
      </div>
    </div>
  ) : null;
}

export default ProgressLoading;
