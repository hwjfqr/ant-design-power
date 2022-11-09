import { defineConfig } from 'dumi';

export default defineConfig({
  mode: 'site',
  title: 'Ant Design Power',
  favicon:
    'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  outputPath: 'docs-dist',
  // more config: https://d.umijs.org/config
  navs: [
    null, // null 值代表保留约定式生成的导航，只做增量配置
    {
      title: 'GitHub',
      path: 'https://github.com/hwjfqr/ant-design-power',
    },
  ],
  apiParser: {
    // 自定义属性过滤配置，也可以是一个函数，用法参考：https://github.com/styleguidist/react-docgen-typescript/#propfilter
    propFilter: {
      // 是否忽略从 node_modules 继承的属性，默认值为 false
      skipNodeModules: true,
      // 需要忽略的属性名列表，默认为空数组
      // skipPropsWithName: ['title'],
      // 是否忽略没有文档说明的属性，默认值为 false
      skipPropsWithoutDoc: false,
    },
  },
  // locales: [
  //   // ['en-US', 'English'],
  //   ['zh-CN', '中文'],
  // ],
  locale: {},
  // 为组件文档项目按需引入 antd ，在 demo 和调试组件中使用。
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
  base: '/ant-design-power/docs-dist/',
  publicPath: '/ant-design-power/docs-dist/',
  // cssModulesTypescriptLoader: {},
  history: {
    type: 'hash',
  },
  hash: true,
  // 开启按需加载
  dynamicImport: {},
});
