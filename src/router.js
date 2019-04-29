import Vue from 'vue'
import Router from 'vue-router'

const HomeView = () =>
    import( /* webpackChunkName: "HomeView" */ './views/HomeView/index.vue')
const MyView = () =>
    import( /* webpackChunkName: "MyView" */ './views/MyView/index.vue')
const RecordInfoView = () =>
    import( /* webpackChunkName: "RecordInfoView" */ './views/RecordView/info.vue')
const RecordSearchView = () =>
    import( /* webpackChunkName: "RecordSearchView" */ './views/RecordView/search.vue')
const BlackListView = () =>
    import( /* webpackChunkName: "BlackListView" */ './views/BlackListView/index.vue')

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/home',
            name: 'home',
            component: HomeView
        },
        {
            path: '/my',
            name: 'my',
            component: MyView
        },
        {
            path: '/record/info',
            name: 'recordInfo',
            component: RecordInfoView
        },
        {
            path: '/record/search',
            name: 'recordSearch',
            component: RecordSearchView
        },
        {
            path: '/blacklist',
            name: 'blacklist',
            component: BlackListView
        },
        {
            path: '*',
            redirect: '/home'
        }
    ]
})
