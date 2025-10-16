<template>
  <view rounded-full bg-neutral-100>
    <wd-input v-model="mobile" type="text" placeholder="请输入手机号" clearable no-border />
  </view>
  <view class="[&_.wd-button]-ml-1" rounded-full bg-neutral-100 mt-3>
    <wd-input
      v-model="captcha"
      clearable no-border use-suffix-slot
      :placeholder="`请输入验证码${isStart ? ' ( 1234 )' : ''}`"
    >
      <template #suffix>
        <wd-button
          size="small"
          :loading="auth.sendCaptcha.isLoading" :disabled="isStart"
          @click="sendCaptcha"
        >
          {{ isStart ? `${Math.floor(output)}秒后重发` : '获取验证码' }}
        </wd-button>
      </template>
    </wd-input>
  </view>
</template>

<script lang="ts" setup>
  import { isMobile } from '@mixte/validator';

  const auth = useAuthStore();

  const mobile = ref('');
  const captcha = ref('');

  const { output, isStart, start } = useCountdown(60, {
    duration: 60 * 1000,
  });

  async function sendCaptcha() {
    if (!mobile.value)
      return uni.showToast({ title: '请输入手机号', icon: 'none' });
    if (!isMobile(mobile.value))
      return uni.showToast({ title: '请输入正确的手机号', icon: 'none' });

    auth.sendCaptcha.execute(mobile.value).then(() => {
      start();
    });
  }

  function validate() {
    if (!mobile.value || !captcha.value) {
      uni.showToast({ title: '请输入手机号和验证码', icon: 'none' });
      return false;
    }
    return true;
  }

  function login() {
    return auth.loginByCaptcha
      .execute({ mobile: mobile.value, captcha: captcha.value });
  }

  defineExpose({
    validate,
    login,
  });
</script>

<script lang="ts">
  export default defineComponent({
    options: {
      virtualHost: true,
      styleIsolation: 'shared',
    },
  });
</script>

<style lang="scss" scoped>
  :deep(.wd-input){
    // 修改组件 CSS 变量示例
    --wot-input-bg: transparent;
    --wot-input-inner-height-no-border: 43px;

    // 在 CSS 中使用 UnoCSS 样式
    --uno: pr-2;

    input{
      --uno: pl-4;
    }
  }
</style>
