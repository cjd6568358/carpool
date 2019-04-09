// pages/my/my.js
const myApp = getApp()
import { getAllRecords } from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    myRecords: [],
    recordInfo: null
  },
  onGotUserInfo(e) {
    this.setData({
      userInfo: e.detail.userInfo
    })
    myApp.globalData.userInfo = e.detail.userInfo
  },
  getMyRecords() {
    wx.showLoading({
      title: '加载中',
    })
    getAllRecords().then(records => {
      let myRecords = records.filter(item => {
        return item.openId === myApp.globalData.openId
      })
      this.setData({
        myRecords,
      }, () => {
        wx.hideLoading()
      })
    })
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
    if (myApp.globalData.userInfo) {
      this.setData({
        userInfo: myApp.globalData.userInfo
      })
    } else {
      myApp.userInfoReadyCallback = (res) => {
        this.setData({
          userInfo: res.userInfo
        })
      }
    }
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
    this.getMyRecords()
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
    this.getMyRecords()
    wx.stopPullDownRefresh()
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