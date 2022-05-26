---
title: Ant Design Power
hero:
  title: Ant Design Power
  desc: 基于 Ant Design，作为 Ant Design 补充性组件库，满足中后台等业务场景通用性组件需求。
  actions:
    - text: 查看组件文档 →
      link: /components
features:
  - icon: https://gw.alipayobjects.com/zos/bmw-prod/881dc458-f20b-407b-947a-95104b5ec82b/k79dm8ih_w144_h144.png
    title: 开箱即用
    desc: 安装引入后即可使用，提供详细的组件使用文档。
  - icon: https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg
    title: Ant Design
    desc: 基于 Ant Design ，在其之上做简朴的逻辑封装，保留了 Ant Design 组件所有功能。
  - icon: https://gw.alipayobjects.com/zos/antfincdn/Eb8IHpb9jE/Typescript_logo_2020.svg
    title: TypeScript
    desc: 使用 TypeScript 开发，提供完整的类型定义文件。
# footer: Alita Team | Copyright © 2020-present
---

## 快速上手

### 安装依赖

```
npm i -S ant-design-power
```

### 使用

```jsx | pure
import { CountdownButton } from 'ant-design-power';

export default const Demo = () => {
  return (
    <div>
      <CountdownButton>获取验证码</CountdownButton>
    </div>
  );
};
```
