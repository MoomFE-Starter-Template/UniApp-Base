<template>
  <HomeLayout>
    <view class="text-5xl">
      <view class="i-iconoir-people-rounded inline-block" />
    </view>

    <view>
      你好，{{ props.name }}
    </view>

    <view class="mt-6">
      <button type="primary" size="mini" @click="back">
        返回
      </button>
    </view>
  </HomeLayout>
</template>

<script lang="ts" setup>
  interface Props {
    name: string
  }

  const props = defineProps<Props>();

  function back() {
    uni.navigateBack();
  }
</script>
