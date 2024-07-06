<template>
  <view class="[&_.nut-input]-bg-transparent px-10">
    <view rounded-full bg-neutral-1>
      <nut-input type="text" placeholder="请输入用户名" :border="false" />
    </view>
    <view rounded-full bg-neutral-1 mt-3>
      <nut-input :type="showPassword ? 'text' : 'password'" :border="false" placeholder="密码">
        <template #right>
          <view class="[&_.wd-button]-(h-auto! c-black/60! p0!) lh-none">
            <wd-button type="text" @click="showPassword = !showPassword">
              <view size-4.5 :class="showPassword ? 'i-mdi-eye-outline' : 'i-mdi-eye-off-outline'" />
            </wd-button>
          </view>
        </template>
      </nut-input>
    </view>

    <view mt-8>
      <wd-button block>登录</wd-button>
    </view>
  </view>
</template>

<script lang="ts" setup>
  const showPassword = ref(false);
</script>

<script lang="ts">
  export default defineComponent({
    options: {
      virtualHost: true,
    },
  });
</script>
