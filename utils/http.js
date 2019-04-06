const http = ((config) => {
  let request = {};
  let methods = ['get', 'post', 'put', 'delete'];
  let baseUrl = 'https://cjd6568358.3322.org:6706/api/';
  methods.forEach((method) => {
    request[method] = (config) => {
      return new Promise((resolve, reject) => {
        let { data: postData = {}, url } = config;
        let isAbsoluteUrl = url.indexOf("//") >= 0;
        url = isAbsoluteUrl ? url : `${baseUrl}${url}`;
        let defaultConfig = {
          url,
          data: '',
          header: {},
          method,
          dataType: 'json',
          responseType: 'text',
          success: (res) => {
            let { data: resData, statusCode, header } = res;
            resolve(resData)
          },
          fail: (res) => {
            reject(res)
          }
        }
        if (method == 'get' && !isAbsoluteUrl) {
          defaultConfig.url = `${defaultConfig.url}?`;
          defaultConfig.url += Object.keys(postData).map((key, index) => {
            return `${key}=${postData[key]}`
          }).join('&')
        } else if (!isAbsoluteUrl) {
          defaultConfig.data = postData
        }
        wx.request(defaultConfig)
      })
    }
  })
  return request;
})()
module.exports = http