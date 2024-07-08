import { request } from '@/utils/request';
import type { ResponseData } from '@/types';

/** 登录响应数据 */
export interface LoginResponse {
  access_token: string;
  expires_in: number;
}

/** 账号密码登录数据 */
export interface UsernameLoginData {
  username: string;
  password: string;
}

/** 账号密码登录 */
export function usernameLogin(data: UsernameLoginData) {
  return request.post<ResponseData<LoginResponse>>('/auth/login', data);
}
