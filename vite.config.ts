import path from 'node:path';
import { defineConfig } from 'vite';
import Uni from '@dcloudio/vite-plugin-uni';
import Unocss from 'unocss/vite';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Inspect from 'vite-plugin-inspect';
import { MixteUseAutoImport } from '@mixte/use/register';

export default defineConfig({
  // 路径别名
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
      '@': path.resolve(__dirname, './src'),
      '@@': path.resolve(__dirname, './'),
    },
  },
  // 插件
  plugins: [
    // 原子化 CSS 引擎
    Unocss(),
    // 自动导入使用到的组件
    Components({
      dts: path.resolve(__dirname, './types/components.d.ts'),
      dirs: [
        path.resolve(__dirname, './src/layouts'),
        path.resolve(__dirname, './src/components'),
        path.resolve(__dirname, './src/components-private'),
      ],
    }),
    // API 自动加载
    AutoImport({
      dts: path.resolve(__dirname, './types/auto-imports.d.ts'),
      vueTemplate: true,
      imports: [
        'vue',
        'uni-app',
        '@vueuse/core',
        '@vueuse/math',
        MixteUseAutoImport({ useWithVueUseCore: true }),
      ],
      dirs: [
        path.resolve(__dirname, './src/composables'),
        path.resolve(__dirname, './src/stores'),
      ],
      eslintrc: {
        enabled: true,
        filepath: path.resolve(__dirname, './.eslintrc-auto-import.json'),
      },
    }),
    // uni-app
    Uni(),
    // 插件调试
    Inspect(),
  ],
});
