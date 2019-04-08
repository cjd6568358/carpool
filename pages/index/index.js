//index.js
//获取应用实例
const app = getApp()
import http from '../../utils/http.js'
import { getAllRecords } from '../../utils/util.js'
Page({
  data: {
    searchParams: {
      free: -1
    },
    currRecords: []
  },
  //事件处理函数
  onSearch({ detail: { mode, title, fromCity, toCity, phone, name, year, month, day, free, remark } }) {
    wx.showLoading({
      title: '正在为您查询中',
    })
    getAllRecords().then(records => {
      let currRecords = records.filter(item => {
        if (item.title !== title && item.year === year && item.month === month && item.day === day && (free === -1 || free === item.free) && (fromCity.indexOf('全部') || item.fromCity === fromCity) && (toCity.indexOf('全部') || item.toCity === toCity)) {
          return true
        } else {
          return false
        }
      })
      this.setData({
        currRecords,
        searchParams: { detail: { mode, title, fromCity, toCity, phone, name, year, month, day, free, remark } }
      }, () => {
        wx.hideLoading()
      })
    })
  },
  onLoad: function (options) {

  },
  onShow() {
    if (this.data.searchParams.detail){
      this.onSearch(this.data.searchParams)
    }
  },
  onPullDownRefresh() {
    this.onSearch(this.data.searchParams)
    wx.stopPullDownRefresh()
  },
  bindPublish() {
    wx.navigateTo({
      url: '/pages/record/record?mode=add',
    })
  }
})
