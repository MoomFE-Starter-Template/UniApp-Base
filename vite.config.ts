import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import Uni from '@dcloudio/vite-plugin-uni';
import Unocss from 'unocss/vite';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Inspect from 'vite-plugin-inspect';
import Inject from '@rollup/plugin-inject';
import { MixteUseAutoImport } from '@mixte/use/register';

export default defineConfig({
  // 路径别名
  resolve: {
    alias: {
      '~': resolve(__dirname, './src'),
      '@': resolve(__dirname, './src'),
      '@@': resolve(__dirname, './'),
    },
  },
  // 插件
  plugins: [
    Inject({
      requestAnimationFrame: resolve(__dirname, './src/modules/polyfills/requestAnimationFrame.ts'),
    }),
    // 原子化 CSS 引擎
    Unocss(),
    // 自动导入使用到的组件
    Components({
      dts: resolve(__dirname, './types/components.d.ts'),
      dirs: [
        resolve(__dirname, './src/layouts'),
        resolve(__dirname, './src/components'),
        resolve(__dirname, './src/components-private'),
      ],
    }),
    // API 自动加载
    AutoImport({
      dts: resolve(__dirname, './types/auto-imports.d.ts'),
      vueTemplate: true,
      imports: [
        'vue',
        'uni-app',
        '@vueuse/core',
        '@vueuse/math',
        MixteUseAutoImport({ useWithVueUseCore: true }),
      ],
      dirs: [
        resolve(__dirname, './src/composables'),
        resolve(__dirname, './src/stores'),
      ],
      eslintrc: {
        enabled: true,
        filepath: resolve(__dirname, './.eslintrc-auto-import.json'),
      },
    }),
    // uni-app
    Uni(),
    // 插件调试
    Inspect(),
  ],
});
