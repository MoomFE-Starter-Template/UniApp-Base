import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import Uni from '@dcloudio/vite-plugin-uni';
import { MixteUseAutoImport } from '@mixte/use/register';
import Inject from '@rollup/plugin-inject';
import Components from '@uni-helper/vite-plugin-uni-components';
import { UniUIResolver, WotResolver } from '@uni-helper/vite-plugin-uni-components/resolvers';
import { isESModule } from 'mixte';
import { NutResolver } from 'nutui-uniapp';
import Unocss from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import { defineConfig } from 'vite';
import Inspect from 'vite-plugin-inspect';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  // 环境变量前缀
  envPrefix: 'APP_',
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
      exclude: [
        'node_modules/wot-design-uni/**',
      ],
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
      resolvers: [
        UniUIResolver(),
        WotResolver(),
        NutResolver(),
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
    isESModule(Uni) ? Uni.default() : Uni(),
    // 插件调试
    Inspect(),
  ],
});
