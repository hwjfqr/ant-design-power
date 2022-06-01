import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { ProgressLoading } from 'ant-design-power';

function ProgressLoadingDemo() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!loading) return;
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [loading]);

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setLoading(true);
        }}
      >
        展示进度加载提示
      </Button>
      <ProgressLoading loading={loading} duration={3}></ProgressLoading>
    </div>
  );
}

export default ProgressLoadingDemo;
