import { defineStore } from 'pinia';
import { accessToken } from '@/shared/env';
import { type UsernameLoginData, usernameLogin } from '@/apis/auth';

export const useAuthStore = defineStore('auth', () => {
  /** 是否登录 */
  const isLogin = computed(() => !!accessToken.value);

  /**
   * 用户名登录
   */
  const loginByUsername = useRequestReactive((data: UsernameLoginData) => {
    return usernameLogin(data).then((res) => {
      accessToken.value = res.data.data.access_token;
    });
  });

  return {
    isLogin,

    loginByUsername,
  };
});
