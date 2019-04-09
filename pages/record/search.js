// pages/record/search.js
import { getAllRecords } from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    key: '',
    mode: 'common',
    currRecords: []
  },
  bindKeyInput({ detail: { value } }) {
    this.setData({
      key: value
    }, () => {
      this.searchRecords()
    })
  },
  searchRecords() {
    if (this.timer) {
      clearTimeout(this.timer)
    }
    this.timer = setTimeout(() => {
      getAllRecords().then(records => {
        records = records.filter(record => record.phone.startsWith(this.data.key))
        this.setData({
          currRecords: records
        })
      })
    }, 500)
  },
  bindeditRecord({ detail }) {
    this.setData({
      recordInfo: detail
    }, () => {
      wx.navigateTo({
        url: `/pages/record/info?mode=edit&recordInfo=${JSON.stringify(detail)}`,
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let { key, mode } = options
    this.setData({
      ...options
    }, () => {
      this.searchRecords()
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