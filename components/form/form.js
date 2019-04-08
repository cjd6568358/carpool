// components/search/search.js
import { formatTime, getCurrCityByIP, cityArea } from '../../utils/util.js'
Component({
  /**
   * 组件的生命周期方法
   */
  lifetimes: {
    attached() {
      // 在组件实例进入页面节点树时执行
      getCurrCityByIP().then(currCity => {
        let { fromCity, toCity, mode } = this.properties
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
        this.attachedData = { ...this.data }
        console.log(this.attachedData)
        this.setData({
          ...this.data
        }, () => {
          if (mode === 'search') {
            this.bindSubmit()
          }
        })
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
    },
    'date': function (date) {
      let [year, month, day] = date.split('-');
      this.setData({
        year, month, day
      })
    },
    '**': function () {
      // 每次 setData 都触发
      if (this.properties.mode === 'search') {
        this.bindSubmit()
      }
    },
  },
  /**
   * 组件的属性列表
   */
  properties: {
    mode: { // 属性名
      type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: 'search', // 属性初始值（可选），如果未指定则会根据类型选择一个['search','publish','readonly','edit']
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
    },
    fee: {
      type: Number,
      value: 100
    },
    phone: {
      type: String,
      value: ""
    },
    name: {
      type: String,
      value: ""
    },
    remark: {
      type: String,
      value: ""
    }
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
    bindSubmit() {
      let { mode, cityList, title, phone, name, year, month, day, free, fromCityAreaIndex, fromCityAreaList, fromCityIndex, remark, toCityAreaIndex, toCityAreaList, toCityIndex } = this.data
      let fromCity = cityList[fromCityIndex] + '-' + fromCityAreaList[fromCityAreaIndex]
      let toCity = cityList[toCityIndex] + '-' + toCityAreaList[toCityAreaIndex]
      this.triggerEvent('submit', { mode, title, fromCity, toCity, phone, name, year, month, day, free, remark })
      // this.bindReset()
    },
    bindReset() {
      console.log(this.attachedData)
      this.setData({
        ...this.attachedData
      })
    },
    bindKeyInput({ detail: { value }, target: { dataset: { key } } }) {
      let data = {}
      data[key] = value
      this.setData({
        ...data
      })
    },
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
