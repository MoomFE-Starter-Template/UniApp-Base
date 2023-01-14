<template>
  <view class="flex flex-col items-center justify-center">
    <image class="size-25 mt-25 mxa mb-6.25" src="/static/logo.png" />
    <view class="flex justify-center">
      <text class="text-4.5 c-[#8f8f94]">{{ title }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  const title = ref('Hello');
</script>
