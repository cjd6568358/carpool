// pages/publish.js
const app = getApp()
import http from '../../utils/http.js'
import { getAllRecords, updateAllRecords } from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  onSubmit({ detail: { mode, title, fromCity, toCity, phone, name, year, month, day, free, remark } }) {
    console.log(mode, title, fromCity, toCity, phone, name, year, month, day, free, remark)
    if (mode === 'publish') {
      getAllRecords().then(records => {
        records.push({
          title, fromCity, toCity, phone, name, year, month, day, free, remark,
          guid: app.globalData.guid,
          time: new Date().getTime()
        })
        updateAllRecords(records).then(() => {
          wx.switchTab({
            url: '/pages/index/index'
          })
        })
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})