export default typeof requestAnimationFrame !== 'undefined'
  ? requestAnimationFrame
  : function (callback: FrameRequestCallback) {
    return setTimeout(() => {
      callback(Date.now());
    }, 1000 / 60);
  };
