import type { Preset, SourceCodeTransformer } from 'unocss';
import { dirname, resolve } from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { dataToEsm } from '@rollup/pluginutils';
import { outputFileSync } from 'fs-extra';
import { defineConfig, presetAttributify, presetIcons, presetWind4, transformerDirectives, transformerVariantGroup } from 'unocss';
import { presetApplet, presetRemRpx, transformerAttributify } from 'unocss-applet';
import { presetExtra } from 'unocss-preset-extra';

const __dirname = dirname(fileURLToPath(import.meta.url));

const isApplet = process.env?.UNI_PLATFORM?.startsWith('mp-') ?? false;

const presets: Preset[] = [
  // 将 rpx 单位转为 rem
  presetRemRpx({ mode: 'rpx2rem' }),
];
const transformers: SourceCodeTransformer[] = [];

if (isApplet) {
  // 默认预设, 和 Tailwind 类似
  presets.push(presetApplet({
    preset: 'wind4',
    presetOptions: { variablePrefix: 'un:' },
  }));
  // 为小程序启用属性模式
  transformers.push(transformerAttributify({
    prefix: 'un:',
    ignoreAttributes: ['block'],
  }));
}
else {
  // 默认预设, 和 Tailwind 4 类似
  presets.push(presetWind4());
  // 属性模式
  presets.push(presetAttributify({ prefix: 'un:' }));
}

export default defineConfig({
  theme: {
    // 过渡持续时间
    duration: {
      colors: '300ms',
    },
  },
  presets: [
    // 图标预设
    presetIcons(),
    // 类名简写及额外一些样式预设
    presetExtra(),
    // 在 UniApp 中使用 Unocss, 兼容不支持的语法
    ...presets,
  ],
  transformers: [
    // 在 CSS 中使用 @apply 指令
    transformerDirectives(),
    // 变体组功能
    transformerVariantGroup(),
    // 在 UniApp 中使用 Unocss, 兼容不支持的语法
    ...transformers,
  ],
  extendTheme: (theme) => {
    // 始终生成一个 UnoCSS 主题样式配置文件, 方便在 JS 中引用
    outputFileSync(
      resolve(__dirname, './src/shared/unocss.theme.ts'),
      `/* eslint-disable */\n\n${dataToEsm(theme, {
        preferConst: true,
        indent: '  ',
        objectShorthand: true,
      })}`,
    );
  },
});
