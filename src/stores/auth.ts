import { defineStore } from 'pinia';
import { accessToken } from '@/shared/env';
import { type UsernameLoginData, getUserInfo, usernameLogin } from '@/apis/auth';

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

  /**
   * 用户信息
   */
  const info = useRequestReactive(() => getUserInfo().then(res => res.data));

  // 登录后获取用户信息
  wheneverImmediate(isLogin, () => {
    info.execute();
  });

  return {
    isLogin,

    loginByUsername,

    info,
  };
});
