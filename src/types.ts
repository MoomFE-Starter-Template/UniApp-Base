/**
 * 后端响应数据
 *  - 根据后端返回的实际情况修改
 */
export interface ResponseData<T = any> {
  code: `${number}`;
  data: T;
  message: string;
}
