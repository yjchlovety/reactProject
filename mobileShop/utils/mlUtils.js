/**
 * Created by liuzhengdong on 2016/12/5.
 * 功用方法
 */

const mlUtils = {
  setTitle: (title) => {
    /**
     * 解决微信、支付宝修改title的问题
     */
    document.title = title;
    const iframe = document.createElement('iframe');
    iframe.style.cssText = 'display: none; width: 0; height: 0;';
    iframe.src = '../favicon.ico';
    const listener = () => {
      setTimeout(() => {
        iframe.removeEventListener('load', listener);
        setTimeout(() => {
          document.body.removeChild(iframe);
        }, 0);
      }, 0);
    };
    iframe.addEventListener('load', listener);
    document.body.appendChild(iframe);
  },

}

export default mlUtils