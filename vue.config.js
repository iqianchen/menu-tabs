import Setting from '@/config/setting.js'

const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    // baseUrl: './',  //vueConf.baseUrl, // 根域上下文目录
    outputDir: 'dist', // 构建输出目录
    assetsDir: 'static', // 静态资源目录 (js, css, img, fonts)
    lintOnSave: true, // 是否开启eslint保存检测，有效值：ture | false | 'error'
    runtimeCompiler: true, // 运行时版本是否需要编译
    transpileDependencies: [], // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
    productionSourceMap: false, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
    chainWebpack: (config)=>{
        //修改文件引入自定义路径
        config.resolve.alias
            .set('@', resolve('src'))
            .set('#', resolve('src/components'))
            .set('p', resolve('src/pages'))
            .set('less', resolve('src/static/less'))
    },
    // 开发环境配置
    devServer: {
        proxy: {
            '/api': {
                target: Setting.baseUrl,    // 跨域地址
                changeOrigin: true,         // 是否跨域
                ws: false,                  // 是否使用https
                pathRewrite: {
                    '^/api': '/api'         // 使用 /api 等同于 target + '/api'
                    // lg:  target为'http://10.10.131.221:8000'    则'/api/user/add'等同于'http://10.10.131.221:8000/api/user/add'
                }
            }
        }
    }
}