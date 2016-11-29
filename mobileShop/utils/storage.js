/**
 * Created by liuzhengdong on 2016/11/16.
 * 数据缓存放在本地
 */

const storage = {
  setItem: (key, value) => {
    localStorage.setItem(key, value)
  },
  setItemJson: (key, value) => {
    storage.setItem(key, JSON.stringify(value))
  },
  getItem: (key) => {
    return localStorage.getItem(key)
  },
  getItemJson: (key) => {
    if (storage.getItem(key)) {
      return JSON.parse(storage.getItem(key))
    }
    return ''
  },
  clearItem: (key) => {
    storage.setItem(key, '')
  },
  clearAll: () => {
    localStorage.clear()
  }
}
export default storage