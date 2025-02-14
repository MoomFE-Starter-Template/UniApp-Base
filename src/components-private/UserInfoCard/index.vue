<!-- 用户信息展示卡片 -->

<template>
  <view v-if="auth.isLogin" class="text-left lh-none el-(6 op-50) rounded-lg mt-6">
    <view class="b-b-(1 solid neutral-3) p-3">当前登录用户信息展示</view>
    <view class="flex items-center justify-between p-3">
      <!-- 用户信息请求中 -->
      <template v-if="auth.info.isLoading">
        <wd-skeleton :row-col="[{ size: '48px', type: 'circle' }]" animation="gradient" />
        <wd-skeleton :custom-style="{ width: '100%', marginLeft: '12px' }" :row-col="[{ width: '50%' }, { width: '100%' }]" animation="gradient" />
      </template>
      <!-- 用户信息请求成功 -->
      <template v-else-if="auth.info.isSuccess">
        <view class="flex-(~ grow) items-center gap-2">
          <nut-avatar :size="50">
            <image :src="auth.info.data?.avatar" />
          </nut-avatar>
          <view class="flex-(~ col justify-center gap-1)">
            <view>{{ auth.info.data?.name }}</view>
            <view class="text-sm op-70">{{ auth.info.data?.username }}</view>
          </view>
        </view>
      </template>
      <!-- 用户信息请求失败 -->
      <template v-else>
        <view class="op-70">用户信息获取失败</view>
      </template>

      <button v-if="auth.info.isFinished" type="warn" size="mini" @click="logout">退出登录</button>
    </view>
  </view>
</template>

<script lang="ts" setup>
  const auth = useAuthStore();

  function logout() {
    uni.showModal({
      title: '退出登录',
      content: '确定要退出登录吗？',
      success: (res) => {
        res.confirm && auth.logout.execute(true);
      },
    });
  }
</script>
