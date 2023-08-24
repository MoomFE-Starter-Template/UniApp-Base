import { resolve } from 'node:path';
import { type Plugin, normalizePath } from 'vite';

const vueDemiPath = normalizePath(
  resolve(__dirname, '../../../', 'node_modules/vue-demi/lib/index.mjs'),
);

/**
 * Uniapp 的 Vue 是阉割版
 * 但是一些第三方库有引用其中的一些 API 或者类型定义, 为了兼容这些库, 我们需要在 'vue-demi' 中导出这些 API 或者类型定义
 * 注意, 该插件仅仅是为了使第三方库能够正常运行, 并不代表依赖于这些 API 的功能能够正常运行
 * 以下列出当前已知的第三方库, 以及它们依赖的 API 或者类型定义
 *
 * @vueuse/core: createTemplatePromise -> TransitionGroup
 */
export function VueDemiPolyfill(options: VueDemiPolyfillOptions = {}): Plugin {
  const {
    TransitionGroupPolyfill = true,
  } = options;

  return {
    name: 'vue-demi-polyfill',
    enforce: 'pre',
    transform(code, id) {
      if (id !== vueDemiPath) return;

      // TransitionGroup
      if (TransitionGroupPolyfill)
        code += '\nexport * from \'../../../scripts/plugins/VueDemiPolyfills/polyfill/TransitionGroup.ts\'';

      return code;
    },
  };
}

interface VueDemiPolyfillOptions {
  /**
   * 是否启用 TransitionGroup 的 polyfill
   * @default true
   */
  TransitionGroupPolyfill?: boolean
}
