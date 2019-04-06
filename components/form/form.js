// components/search/search.js
import { formatTime, getCurrCityByIP, cityArea } from '../../utils/util.js'
import http from '../../utils/http.js'
Component({
  /**
   * 组件的生命周期方法
   */
  lifetimes: {
    attached() {
      // 在组件实例进入页面节点树时执行
      getCurrCityByIP().then(currCity => {
        let { fromCity, toCity } = this.properties
        if (currCity === '上海市') {
          fromCity = ['上海', '全部']
          toCity = ['建湖', '全部']
        }
        let startDate = formatTime(new Date(), 'yyyy-MM-dd')
        let endDate = formatTime(new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * 3), 'yyyy-MM-dd')
        let cityList = Object.keys(cityArea)
        let fromCityIndex = cityList.findIndex(item => item === fromCity[0])
        let fromCityAreaIndex = cityArea[fromCity[0]].findIndex(item => item === fromCity[1])
        let toCityIndex = cityList.findIndex(item => item === toCity[0])
        let toCityAreaIndex = cityArea[toCity[0]].findIndex(item => item === toCity[1])
        Object.assign(this.data, {
          cityArea,
          cityList,
          fromCity,
          toCity,
          fromCityIndex,
          toCityIndex,
          toCityIndex,
          toCityAreaIndex,
          startDate,
          endDate
        }, this.properties)
        console.log(this.data)
        this.setData({
          ...this.data
        })
        http.post({
          url: 'getStorageSync',
          data: { key: 'carpool' }
        }).then(data => console.log(data))
      })
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
    'fromCityIndex': function (fromCityIndex) {
      let { cityList, cityArea, toCityIndex } = this.data
      let fromCityAreaList = cityArea[cityList[fromCityIndex]]
      let toCityAreaList = cityArea[cityList[toCityIndex]]
      this.setData({
        fromCityAreaList,
        toCityAreaList,
        fromCityAreaIndex: 0,
        toCityAreaIndex: 0
      })
    },
    'toCityIndex': function (toCityIndex) {
      let { cityList, cityArea, fromCityIndex } = this.data
      let fromCityAreaList = cityArea[cityList[fromCityIndex]]
      let toCityAreaList = cityArea[cityList[toCityIndex]]
      this.setData({
        fromCityAreaList,
        toCityAreaList,
        fromCityAreaIndex: 0,
        toCityAreaIndex: 0
      })
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    mode: { // 属性名
      type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: 'search', // 属性初始值（可选），如果未指定则会根据类型选择一个
      observer(newVal, oldVal, changedPath) {
        // 属性被改变时执行的函数（可选），通常 newVal 就是新设置的数据， oldVal 是旧数
        // 新版本基础库不推荐使用这个字段，而是使用 Component 构造器的 observer 字段代替（这样会有更强的功能和更好的性能）
      }
    },
    title: {
      type: String,
      value: "人找车"
    },
    date: {
      type: String,
      value: formatTime(new Date(), 'yyyy-MM-dd')
    },
    fromCity: {
      type: Array,
      value: ['建湖', '全部']
    },
    toCity: {
      type: Array,
      value: ['上海', '全部']
    },
    free: {
      type: Number,
      value: -1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    records: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindDateChange({ detail: { value } }) {
      this.setData({
        date: value
      })
    },
    bindFromCityChange({ detail: { value } }) {
      let fromCityIndex = +value
      let { cityList } = this.data
      let toCityIndex = fromCityIndex + 1
      if (cityList.length - 1 === fromCityIndex) {
        toCityIndex = 0
      }
      this.setData({
        fromCityIndex,
        toCityIndex
      })
    },
    bindFromCityAreaChange({ detail: { value } }) {
      this.setData({
        fromCityAreaIndex: +value
      })
    },
    bindToCityChange({ detail: { value } }) {
      let toCityIndex = +value
      let { cityList } = this.data
      let fromCityIndex = toCityIndex + 1
      if (cityList.length - 1 === toCityIndex) {
        fromCityIndex = 0
      }
      console.log(fromCityIndex,
        toCityIndex)
      this.setData({
        fromCityIndex,
        toCityIndex
      })
    },
    bindToCityAreaChange({ detail: { value } }) {
      this.setData({
        toCityAreaIndex: +value
      })
    },
    bindClick({ target: { dataset } }) {
      this.setData({
        ...dataset
      })
    }
  }
})
