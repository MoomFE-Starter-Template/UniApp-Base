/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** 接口请求基础路径 */
  readonly APP_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
