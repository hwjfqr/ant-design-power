import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { ButtonProps } from 'antd/es/button';
import 'antd/es/button/style';

const MAX_SECOND_NUM = 60;

interface CountdownButtonType extends ButtonProps {
  /**
   * 最大秒数
   */
  maxSecondNum?: number;
  /**
   * 最大秒数
   */
  txt?: string;
  /**
   * 最大秒数
   */
  loadingTxt?: string;
  /**
   * 最大秒数
   */
  handleOnClick: (cb: () => void) => void;
}
function CountdownButton({
  maxSecondNum = MAX_SECOND_NUM,
  txt = '获取验证码',
  loadingTxt = '发送中',
  handleOnClick = () => {},
  ...rest
}: CountdownButtonType) {
  const [authCodeArgs, setAuthCodeArgs] = useState({
    timing: false,
    count: maxSecondNum,
  });

  useEffect(() => {
    let timer: number | undefined = undefined;
    if (authCodeArgs.timing) {
      timer = window.setInterval(() => {
        setAuthCodeArgs((pre) => {
          const { count, timing } = pre;
          if (count === 1) {
            window.clearInterval(timer);
            return { timing: false, count: maxSecondNum };
          }
          return { timing, count: count - 1 };
        });
      }, 1000);
    }
    return () => window.clearInterval(timer);
  }, [authCodeArgs.timing]);

  const successCallback = () => {
    setAuthCodeArgs({
      ...authCodeArgs,
      timing: true,
    });
  };

  return (
    <Button
      disabled={authCodeArgs.timing}
      onClick={() => {
        handleOnClick(successCallback);
      }}
      {...rest}
    >
      {rest.loading
        ? loadingTxt
        : authCodeArgs.timing
        ? authCodeArgs.count
        : txt}
    </Button>
  );
}

export default CountdownButton;
