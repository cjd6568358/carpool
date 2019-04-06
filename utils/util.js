const formatTime = (date, fmt) => {
  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

const getTotalDaysArr = (yyyy, MM, leftPad = false) => {
  return new Array(new Date(yyyy, MM, 0).getDate()).fill(0).map((item, index) => {
    ++index
    return leftPad ? '0' + index : index
  })
}

const calculatGUID = () => {
  let guid = '';
  for (let i = 1; i <= 32; i++) {
    let n = Math.floor(Math.random() * 16.0).toString(16);
    guid += n;
    if ((i == 8) || (i == 12) || (i == 16) || (i == 20)) {
      guid += '-';
    }
  }
  return guid;
}

const getCurrCityByIP = () => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'https://api.map.baidu.com/location/ip?ak=qkwXKuCY5GsctKcaopqTGbnl',
      method: 'get',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        if (res.data.status === 0) {
          resolve(res.data.content.address_detail.province)
        }
      }
    })
  })
}

const cityArea = {
  "上海": [
    "全部",
    "宝山",
    "长宁",
    "崇明",
    "奉贤",
    "虹口",
    "黄浦",
    "嘉定",
    "金山",
    "静安",
    "卢湾",
    "闵行",
    "南汇",
    "浦东",
    "普陀",
    "青浦",
    "松江",
    "徐汇",
    "杨浦"
  ],
  "建湖": [
    "全部",
    "上冈镇",
    "建阳镇",
    "颜单镇",
    "恒济镇",
    "庆丰镇",
    "高作镇",
    "芦沟镇",
    "沿河镇",
    "冈西镇",
    "宝塔镇",
    "九龙口镇",
    "近湖街道",
    "钟庄街道",
    "塘河街道",
    "经济开发区",
    "高新技术经济区",
    "九龙口旅游度假区"
  ]
}

module.exports = {
  formatTime,
  getTotalDaysArr,
  calculatGUID,
  getCurrCityByIP,
  cityArea
}