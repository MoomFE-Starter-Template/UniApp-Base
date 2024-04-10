<template>
  <view class="relative mx-auto" :class="props.size">
    <view class="i-logos-vue size-full" />
    <view class="i-carbon-template size-1/2 absolute right-0 bottom-0" />
  </view>
</template>

<script lang="ts" setup>
  interface Props {
    size?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    size: 'size-12',
  });
</script>
