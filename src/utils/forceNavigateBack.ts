/**
 * 返回上一页, 如果没有上一页则返回首页
 */
export function forceNavigateBack() {
  const pages = getCurrentPages();

  if (pages.length > 1)
    return uni.navigateBack();

  uni.reLaunch({
    url: '/pages/index',
  });
}
