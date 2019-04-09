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
  onSearch({ detail: { mode, type, fromCity, toCity, phone, name, year, month, day, free, remark } }) {
    wx.showLoading({
      title: '正在为您查询中',
    })
    let fromCityArr = fromCity.split('-');
    let toCityArr = toCity.split('-');
    getAllRecords().then(records => {
      let currRecords = records.filter(item => {
        if (item.type !== type && item.year === year && item.month === month && item.day === day && (free === -1 || free === item.free) && (item.fromCity === fromCity || (item.fromCity.startsWith(fromCityArr[0]) && fromCityArr[1] === '全部')) && (item.toCity === toCity || (item.toCity.startsWith(toCityArr[0]) && toCityArr[1] === '全部'))) {
          return true
        } else {
          return false
        }
      })
      this.setData({
        currRecords,
        searchParams: { detail: { mode, type, fromCity, toCity, phone, name, year, month, day, free, remark } }
      }, () => {
        wx.hideLoading()
      })
    })
  },
  onLoad: function (options) {

  },
  onShow() {
    if (this.data.searchParams.detail) {
      this.onSearch(this.data.searchParams)
    }
  },
  onPullDownRefresh() {
    this.onSearch(this.data.searchParams)
    wx.stopPullDownRefresh()
  }
})
