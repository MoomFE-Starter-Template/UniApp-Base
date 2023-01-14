import { defineConfig } from 'vite';
import Uni from '@dcloudio/vite-plugin-uni';
import Unocss from 'unocss/vite';

export default defineConfig({
  // 插件
  plugins: [
    // uni-app
    Uni(),
    // 原子化 CSS 引擎
    Unocss(),
  ],
});
