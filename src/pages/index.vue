<template>
  <HomeLayout>
    <TheLogo />

    <view class="mt-2">
      Uniapp 项目模板
    </view>

    <view class="mt-6">
      <view class="w-66 max-w-full mx-auto">
        <uni-easyinput v-model="name" class="text-center!" type="text" placeholder="你的名字是？" :clearable="false" @confirm="go" />
      </view>
    </view>

    <view class="mt-3">
      <button type="primary" size="mini" :disabled="!name" @click="go">
        确定
      </button>
    </view>

    <view class="text-(base red) mt-12">
      ↓ ------ 示例页 ------ ↓
    </view>

    <view class="mt-6">
      <button size="mini" @click="toLogin">
        登录
      </button>
    </view>
  </HomeLayout>
</template>

<script lang="ts" setup>
  const name = ref('');

  function go() {
    uni.navigateTo({
      url: `/pages/hello/name?name=${name.value}`,
    });
  }

  function toLogin() {
    uni.navigateTo({
      url: '/pages/login/index',
    });
  }
</script>

<style lang="scss">
  /* #ifndef H5 || APP-PLUS */
    .uni-easyinput ::v-deep input{
      text-align: center;
    }
  /* #endif */
</style>
