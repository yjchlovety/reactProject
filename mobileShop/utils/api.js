import fetch from 'isomorphic-fetch'
import _ from 'lodash'
import URL from 'url'
const IS_DEBUG = true

function addApiServerHeader (headers) {
  // 后端手动在浏览器中设置localStorage
  let apiServer = global.localStorage.getItem('API_SERVER')
  if (apiServer) {
    headers[ 'api-server' ] = apiServer
  }
}

function request (url, options) {
  return new Promise((resolve, reject) => {
    options = options || {}
    options.headers = options.headers || {}
    options.headers.Accept = 'application/json; charset=utf-8'
    options.headers[ 'Content-Type' ] = 'application/json; charset=utf-8'
    options.headers.pragma = 'no-cache'
    options.headers[ 'cache-control' ] = 'no-cache'
    if (IS_DEBUG) {
      addApiServerHeader(options.headers)
    }
    options.body = JSON.stringify(options.body)
    // 非常重要!!! 否则所有cookie都将失效
    options.credentials = 'same-origin'
    fetch(`/api${url}`, options)
      .then(resp => {
        // console.log('resp', resp.json)
        let msg = ''
        if (resp.status !== 200) {
          switch (resp.status) {
            case 401:
              msg = '请登录'
              break
            case 404:
              msg = `请求地址出错: ${url}`
              break
            case 500:
              msg = '服务器错误'
              break
            case 503:
              msg = '服务器错误'
              break
            default:
              msg = '未知错误'
          }
          throw new Error(msg)
        }
        return resp.text()
      })
      .then(jsonStr => {
        try {
          // 为了解决大于号小于号被转义的问题,把转义过的转回正常值,再交给框架处理.,框架自动处理xss
          jsonStr = jsonStr.replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
          resolve(JSON.parse(jsonStr))
        } catch (e) {
          // reject(e)
          reject({
            description: '解析数据出错'
          })
        }
      })
      // fetch 的catch, 目前只发现断网会触发
      .catch(err => {
        reject({
          description: err.message || '未知错误'
        })
      })
  })
}

export const get = function get (url) {
  return request(url)
}

export const post = function post (url, data) {
  return request(url, {
    body: data,
    method: 'POST'
  })
}

export const del = function del (url, data) {
  return request(url, {
    body: data,
    method: 'DELETE'
  })
}

export const put = function put (url, data) {
  return request(url, {
    body: data,
    method: 'PUT'
  })
}

export const query = function query (url, data) {
  return request(url, {
    body: data,
    method: 'POST'
  })
}

export const upload = function upload (url, form, isNeedCred = false) {
  let options = {}
  if (!global.FormData) {
    console.warn('your browser not support upload')
    return
  }
  /*eslint-disable */
  if (!form instanceof global.FormData) {
    console.warn('only support formdata upload')
    return
  }
  /*eslint-disable */
  options = {
    method: 'POST',
    body: form,
    headers: {},
  }

  if (isNeedCred) {
    options.credentials = 'same-origin'
    url = `/api${url}`
  }
  // todo api模块需要统一!!!
  if (IS_DEBUG) {
    addApiServerHeader(options.headers)
  }
  return fetch(url, options)
}

export default {
  get (url, options) {
    url = URL.format({
      pathname: url,
      query: options.params,
    })
    return get(url)
  }
}

/**
 * 对多个数组内的元素做排列组合, 每个数组只取 1 个元素, 用逗号隔开
 * @param arr1 { Array }
 * @param arr2 { Array }
 * @param otherArrs { Array[] }
 * @returns { Array }
 * @constructor
 */
export const makeArrangementAndCombination =
  function makeArrangementAndCombination (arr1, arr2, ...otherArrs) {
    let resultArr = _.reduce(arr1, (newArr, x) => {
      if (!arr2 || !arr2.length) {
        newArr.push(x + '')
      } else {
        _.reduce(arr2, (ra, y) => {
          ra.push(x + ',' + y)
          return ra
        }, newArr)
      }
      return newArr
    }, [])

    if (!otherArrs.length) {
      return resultArr
    }

    return makeArrangementAndCombination(resultArr, ...otherArrs)
  }
