import Vue from 'vue'
import Vuex from 'vuex'
import { calculatGUID } from './util/index'
import { getStorageSync, setStorageSync } from './api'

Vue.use(Vuex)

let userId = localStorage.getItem('userId')
if (!userId) {
    userId = calculatGUID()
    localStorage.setItem('userId', userId)
}

export default new Vuex.Store({
    state: {
        userInfo: null,
        userId,
        records: []
    },
    mutations: {
        SET_ALL_RECORDS: (state, records) => {
            state.records = records
        },
    },
    actions: {
        async FETCH_ALL_RECORDS({ commit, dispatch, state, getters }) {
            let records = await getStorageSync('carpool')
            if (!records) {
                records = []
            }
            records = records.filter(({ year, month, day }) => {
                // 过滤所有过期数据
                if (new Date(`${year}-${month}-${day}`).getTime() + 24 * 60 * 60 * 1000 < Date.now()) {
                    return false
                } else {
                    return true
                }
            })
            commit('SET_ALL_RECORDS', records)
        },
        async UPDATE_ALL_RECORDS({ commit, dispatch, state, getters }, records) {
            await setStorageSync('carpool', records)
            commit('SET_ALL_RECORDS', records)
        }
    }
})
