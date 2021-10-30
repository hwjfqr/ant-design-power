import React, { useState } from 'react';
import { EditableTag } from 'ant-design-power';

function EditableTagDemo() {
  const [tags, setTags] = useState(['北京', '上海', '广州', '深圳']);

  return (
    <div>
      <EditableTag
        value={tags}
        onChange={(tags) => {
          console.log(tags);
          setTags(tags);
        }}
      ></EditableTag>
    </div>
  );
}

export default EditableTagDemo;
