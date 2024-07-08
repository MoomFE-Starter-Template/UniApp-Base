<template>
  <view h-screen flex="~ col">
    <view class="flex-none">
      <wd-navbar
        custom-class="[&,&::after]-bg-transparent!"
        fixed placeholder safe-area-inset-top left-arrow
      />
    </view>

    <view flex="grow ~ col justify-center items-center">
      <TheLogo />

      <view w-full mt-6 px-10>
        <UsernameForm v-if="type === 'username'" ref="formRef" />

        <view flex="~ items-center wrap" text="sm center neutral" mt-4>
          <wd-checkbox v-model="agree" />
          <text>已阅读并同意</text>
          <text c-blue-6 @click="no()">《用户协议》</text>
          <text>和</text>
          <text c-blue-6 @click="no()">《隐私协议》</text>
        </view>

        <view mt-8>
          <wd-button block @click="login()">登录</wd-button>
        </view>
      </view>

      <wd-message-box>
        <text>请阅读并同意</text>
        <text c-blue-6 @click="no()">《用户协议》</text>
        <text>和</text>
        <text c-blue-6 @click="no()">《隐私协议》</text>
      </wd-message-box>
    </view>
  </view>
</template>

<script lang="ts" setup>
  import { useMessage } from 'wot-design-uni';
  import UsernameForm from './children/username-form.vue';

  const message = useMessage();

  const type = ref<'username' | 'captcha'>('username');

  const formRef = ref<InstanceType<typeof UsernameForm>>();

  const agree = ref(false);

  async function login() {
    if (!await formRef.value?.validate()) return;
    if (!await checkAgree()) return;

    try {
      await formRef.value?.login();
    }
    catch (error) {
      console.error(error);
    }
  }

  async function checkAgree() {
    if (agree.value) return true;

    return message.confirm({
      title: '服务协议与隐私保护',
      confirmButtonText: '同意',
      cancelButtonText: '不同意',
    })
      .then(() => agree.value = true);
  }

  function no() {
    uni.showToast({ title: '暂无', icon: 'none' });
  }
</script>
