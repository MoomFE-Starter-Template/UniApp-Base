import { defineStore } from 'pinia';
import { accessToken } from '@/shared/env';
import { type UsernameLoginData, getUserInfo, logout as toLogout, usernameLogin } from '@/apis/auth';

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

  /**
   * 退出登录
   */
  const logout = useRequestReactive((showToast?: boolean) => {
    return toLogout().finally(() => {
      accessToken.value = '';
      showToast && uni.showToast({ title: '退出登录成功', icon: 'none' });
    });
  });

  return {
    isLogin,

    loginByUsername,
    info,
    logout,
  };
});
