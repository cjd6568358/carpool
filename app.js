//app.js
import { calculatGUID } from './utils/util.js'
import http from './utils/http.js'
App({
  onLaunch: function () {
    // 展示本地存储能力
    let guid = wx.getStorageSync('guid')
    if (!guid) {
      guid = calculatGUID()
      wx.setStorageSync('guid', guid)
      wx.showModal({
        title: '提示',
        content: '本平台仅作信息交流展示，请自行鉴别信息真伪'
      })
    }
    this.globalData.guid = guid

    let openId = wx.getStorageSync('openId')
    if (!openId) {
      // 登录
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          console.log(res)
          http.get({
            url: `wechat/code2Session/${res.code}`
          }).then(({ data }) => {
            wx.setStorageSync('openId', data.openid)
            this.globalData.openId = data.openid
          })
        }
      })
    } else {
      this.globalData.openId = openId
    }


    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    guid: "",
    openId: '',
    records: []
  }
})