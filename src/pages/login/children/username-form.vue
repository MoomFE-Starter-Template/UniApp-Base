<template>
  <view rounded-full bg-neutral-1>
    <wd-input v-model="username" type="text" placeholder="请输入账号" clearable no-border />
  </view>
  <view rounded-full bg-neutral-1 mt-3>
    <wd-input v-model="password" placeholder="请输入密码" show-password clearable no-border />
  </view>
</template>

<script lang="ts" setup>
  const username = ref('');
  const password = ref('');

  function validate() {
    if (!username.value || !password.value) {
      uni.showToast({ title: '请输入账号和密码', icon: 'none' });
      return false;
    }
    return true;
  }

  function login() {

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
    --wot-input-bg: transparent;
    --wot-input-inner-height-no-border: 43px;

    --uno: pr-4;

    input{
      --uno: pl-4;
    }
  }
</style>
