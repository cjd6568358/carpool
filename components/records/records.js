// components/records/records.js
import { formatTime } from '../../utils/util.js'
Component({
  /**
   * 组件的生命周期方法
   */
  lifetimes: {
    attached() {
      // 在组件实例进入页面节点树时执行
    },
    detached() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  /**
   * 组件所在页面的生命周期
   */
  pageLifetimes: {
    show() {
      // 页面被展示
    },
    hide() {
      // 页面被隐藏
    },
    resize(size) {
      // 页面尺寸变化
    }
  },
  observers: {
  },
  /**
   * 组件的属性列表
   */
  properties: {
    records: {
      type: Array,
      value: []
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindCall({ target: { dataset: { phone } } }) {
      wx.makePhoneCall({
        phoneNumber: phone
      })
    },
  }
})

