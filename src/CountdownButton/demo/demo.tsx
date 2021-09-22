import React from 'react';
import { CountdownButton } from 'ant-design-power';

function CountdownButtonDemo() {
  return (
    <div>
      <CountdownButton
        handleOnClick={(cb) => {
          console.log('1221');
          setTimeout(() => {
            cb();
          }, 1000);
        }}
      >
        获取验证码
      </CountdownButton>
    </div>
  );
}

export default CountdownButtonDemo;
