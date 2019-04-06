//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    searchParams: {}
  },
  //事件处理函数
  onSearch: function (type) {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {

  }
})
