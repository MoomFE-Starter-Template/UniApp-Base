import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { createUniAppAxiosAdapter } from '@uni-helper/axios-adapter';
import type { ResponseData } from '@/types';
import { accessToken } from '@/shared/env';

axios.defaults.adapter = createUniAppAxiosAdapter();

export const instance = axios.create({
  baseURL: import.meta.env.APP_BASE_URL ?? '',
  adapter: createUniAppAxiosAdapter(),
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 添加 Token
    if (accessToken.value)
      config.headers.Authorization = `Bearer ${accessToken.value}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse<ResponseData>) => {
    // 后端提示错误
    //  - 根据后端返回的实际情况修改
    if (response.data.code !== '20000') {
      // Token 失效
      if (['40001', '40005'].includes(response.data.code)) {
        uni.hideLoading();
        uni.showToast({ title: '登录已过期，请重新登录', icon: 'none' });

        return Promise.reject(response.data.message);
      }

      uni.hideLoading();
      uni.showToast({
        title: response.data.message,
        icon: 'none',
      });

      return Promise.reject(response.data.message);
    }

    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);
