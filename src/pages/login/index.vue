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

      <view class="w-full mt-6">
        <UsernameLogin v-if="type === 'username'" />
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
  import UsernameLogin from './children/username-login.vue';

  const type = ref<'username' | 'captcha'>('username');
</script>
