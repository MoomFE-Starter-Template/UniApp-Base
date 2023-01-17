<template>
  <view class="px-4 py-10 text-center">
    <TheLogo />

    <view class="mt-2">
      Uniapp 项目模板
    </view>

    <view class="mt-6">
      <view class="w-62.5 max-w-full mx-auto">
        <uni-easyinput v-model="name" class="text-center!" type="text" placeholder="你的名字是？" :clearable="false" @confirm="go" />
      </view>
    </view>

    <view class="mt-3">
      <button type="primary" size="mini" :disabled="!name" @click="go">
        确定
      </button>
    </view>
  </view>
</template>

<script lang="ts" setup>
  const name = ref('');

  function go() {
    uni.navigateTo({
      url: `/pages/hello/name?name=${name.value}`,
    });
  }
</script>
