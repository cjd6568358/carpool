import http from '../util/http'

export let getStorageSync = async (key) => {
    let { data, statusCode } = await http.post('getStorageSync', { key })
    return data
}

export let setStorageSync = async (key, value) => {
    let { statusCode } = await http.post('setStorageSync', { key, value })
    return statusCode === 1
}