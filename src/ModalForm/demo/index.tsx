import React, { useState } from 'react';
import { ModalForm } from 'ant-design-power';

function ModalFormDemo() {
  const [dataFormArgs, setDataFormArgs] = useState({
    visible: false,
    data: {
      username: 'admin',
      type: 'admin',
    },
  });

  return <div></div>;
}

export default ModalFormDemo;
