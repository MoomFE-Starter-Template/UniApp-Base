import { isBrowser } from 'mixte';

export default isBrowser
  ? window.requestAnimationFrame
  : function (callback: FrameRequestCallback) {
    return setTimeout(() => {
      callback(Date.now());
    }, 1000 / 60);
  };
