// pages/publish.js
const app = getApp()
import http from '../../utils/http.js'
import { getAllRecords, updateAllRecords, calculatGUID } from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mode: 'add',
    dynamic: {}
  },

  onSubmit({ detail: { mode, title, fromCity, toCity, phone, name, year, month, day, free, fee, remark, id } }) {
    console.log(mode, title, fromCity, toCity, phone, name, year, month, day, free, fee, remark)
    if (mode === 'add') {
      getAllRecords().then(records => {
        records.push({
          title, fromCity, toCity, phone, name, year, month, day, free, fee, remark,
          userId: app.globalData.guid,
          id: calculatGUID(),
          time: new Date().getTime()
        })
        updateAllRecords(records).then(() => {
          wx.switchTab({
            url: '/pages/index/index'
          })
        })
      })
    } else if (mode === 'edit') {
      getAllRecords().then(records => {
        records = records.filter(item => item.id !== id)
        records.push({
          title, fromCity, toCity, phone, name, year, month, day, free, fee, remark, id,
          userId: app.globalData.guid,
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
   * 校验是否存在历史拼车订单
   */
  checkHistoryRecord() {
    getAllRecords().then(records => {
      records = records.filter(record => {
        return record.userId === app.globalData.guid
      })
      if (records.length) {
        wx.showModal({
          title: '温馨提示',
          content: '系统检测到您已经发布了' + records.length + '条信息,是否需要更新它们?',
          success({ confirm, cancel }) {
            if (confirm) {
              wx.switchTab({
                url: '/pages/my/my'
              })
            }
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let { mode, recordInfo: dynamic = {} } = options
    console.log(typeof dynamic)
    if (typeof dynamic === 'string') {
      dynamic = JSON.parse(dynamic)
    }
    if (mode === 'add') {
      this.checkHistoryRecord()
    } else if (mode === 'edit') {
      dynamic.fromCity = dynamic.fromCity.split('-')
      dynamic.toCity = dynamic.toCity.split('-')
    }
    this.setData({
      mode,
      dynamic
    })
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