import path from 'path';
import fs from 'fs-extra';
import uniMigration from '@dcloudio/uni-migration';

const vantSrcPath = path.resolve(__dirname, '../node_modules/@vant/weapp/dist');
const vantPath = path.resolve(__dirname, '../src/wxcomponents/vant');

// 拷贝 Vant Weapp 组件到项目内
fs.copySync(vantSrcPath, vantPath);

// 编译 Vant Weapp 组件为 vue 组件
uniMigration(vantPath, undefined, {
  silent: true,
});
