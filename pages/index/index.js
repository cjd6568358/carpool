//index.js
//获取应用实例
const app = getApp()
import http from '../../utils/http.js'
Page({
  data: {
    searchParams: {},
    records: []
  },
  //事件处理函数
  onSearch({ detail: { mode, title, fromCity, toCity, contact, date, free, remark } }) {
    http.post({
      url: 'getStorageSync',
      data: { key: 'carpool' }
    }).then(records => {
      if (records) {
        console.log(records)
        this.setData({
          records
        },()=>{
          
        })
      }
    })
  },
  onLoad: function (options) {

  }
})
