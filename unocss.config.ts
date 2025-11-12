import type { Preset, SourceCodeTransformer } from 'unocss';
import { dirname, resolve } from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { dataToEsm } from '@rollup/pluginutils';
import fs from 'fs-extra';
import { isString } from 'mixte';
import { defineConfig, presetAttributify, presetIcons, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss';
import { presetApplet, presetRemRpx, transformerAttributify } from 'unocss-applet';
import { presetExtra } from 'unocss-preset-extra';

const __dirname = dirname(fileURLToPath(import.meta.url));

const isApplet = process.env?.UNI_PLATFORM?.startsWith('mp') ?? false;

const presets: Preset[] = [];
const transformers: SourceCodeTransformer[] = [];

if (isApplet) {
  // 默认预设, 和 Tailwind 类似
  presets.push(presetApplet({ variablePrefix: 'un:' }));
  // 将 rpx 单位转为 rem
  presets.push(presetRemRpx({ mode: 'rpx2rem' }));
  // 为小程序启用属性模式
  transformers.push(transformerAttributify({ prefix: 'un:', ignoreAttributes: ['block'] }));
}
else {
  // 默认预设, 和 Tailwind 类似
  presets.push(presetUno());
  // 属性模式
  presets.push(presetAttributify({ prefix: 'un:' }));
  // 将 rpx 单位转为 rem
  presets.push(presetRemRpx({ mode: 'rpx2rem' }));
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
    fs.outputFileSync(
      resolve(__dirname, './src/shared/unocss.theme.ts'),
      `/* eslint-disable */\n\n${dataToEsm(theme, {
        preferConst: true,
        indent: '  ',
        objectShorthand: true,
      })}`,
    );
  },
  postprocess: (util) => {
    util.entries.forEach((i) => {
      if (isString(i[1])) {
        i[1] = i[1].replace(/in (oklch|oklab)/g, '');
      }
    });
  },
});
