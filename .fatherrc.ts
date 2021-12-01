// 配置项说明文档：https://github.com/umijs/father

export default {
  esm: 'babel', // 通过 babel 编译相关组件即可，而无需打包在一个文件中，实现在使用时可按需加载。
  cjs: 'babel',
  lessInBabelMode: true,
  // 打包的产物内通过按需加载形式引入 antd 。
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
};
