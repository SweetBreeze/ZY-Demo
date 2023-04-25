// useLocal=true 使用本地开发环境
userLocal = false;

// vue.config.js
module.exports = {
    // outputDir: '../admin-server/src/main/resources/static/',
    productionSourceMap: false,
    css: {
        sourceMap: false
    },
    pages: {
        index: {
            // entry for the page
            entry: 'src/main.ts',
            // the source template
            template: 'public/index.html',
            // output as dist/index.html
            filename: 'index.html',
            // when using title option,
            // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
            title: '上海正也医药有限公司'
        }
    },
    devServer: {
        port: 21091,
        proxy: {
            '/upload': {
                target: userLocal ? 'http://127.0.0.1:21099' : 'http://192.168.2.235:38050'
            },
            '/api': {
                target: userLocal ? 'http://127.0.0.1:21099' : 'http://192.168.2.235:38050'
            }
        }
    },
    pluginOptions: {
        i18n: {
            locale: 'zh-cn',
            fallbackLocale: 'zh-cn',
            localeDir: 'locales',
            enableInSFC: false
        },
        moment: {
            locales: ['']
        }
    }
};
