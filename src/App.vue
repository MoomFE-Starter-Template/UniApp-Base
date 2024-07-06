<script lang="ts" setup>
  // #ifdef MP
  const updateManager = uni.getUpdateManager();

  updateManager.onUpdateReady(() => {
    uni.showModal({
      title: '更新提示',
      content: '新版本已经准备好，是否重启应用？',
      success: (res) => {
        if (res.confirm)
          updateManager.applyUpdate();
      },
    });
  });
  // #endif

  onLaunch(() => {
    console.log('App Launch'); // eslint-disable-line no-console
  });
  onShow(() => {
    console.log('App Show'); // eslint-disable-line no-console
  });
  onHide(() => {
    console.log('App Hide'); // eslint-disable-line no-console
  });
</script>

<style lang="scss">
  @import 'nutui-uniapp/styles/index';
</style>
