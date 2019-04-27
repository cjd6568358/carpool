const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    publicPath: '/carpool',
    outputDir: 'docs',

    chainWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            let option = null
            config.plugin('html').tap(args => {
                option = Object.assign({}, args[0])
                return args
            })
            option.filename = '404.html'
            config
                .plugin('404')
                .use(HtmlWebpackPlugin, [option]);
        } else {
            // 为开发环境修改配置...
        }
    },

    pwa: {
        name: '建湖拼车小助手',
        themeColor: '#108ee9',
        msTileColor: 'transparent',
        iconPaths: {
            favicon32: 'favicon.png',
            favicon16: 'favicon.png',
            appleTouchIcon: 'img/logo.png',
            maskIcon: 'img/logo.png',
            msTileImage: 'img/logo.png'
        },
        workboxOptions: {
            importWorkboxFrom: 'local',
            clientsClaim: true, // Service Worker 被激活后使其立即获得页面控制权
            skipWaiting: true, // 强制等待中的 Service Worker 被激活
            runtimeCaching: [
                // 配置路由请求缓存
                {
                    urlPattern: /\/xgj\/(tools|discuz|sign|password|my)$/, // 匹配文件
                    handler: 'networkFirst', // 网络优先
                    options: {
                        cacheableResponse: {
                            statuses: [200, 404]
                        }
                    }
                }
            ]
        }
    },

    productionSourceMap: false
}