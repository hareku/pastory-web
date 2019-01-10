const { ENV } = require('./configs/env')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const routerConfig = {}
if (ENV.BASE_URL) {
  routerConfig.base = ENV.BASE_URL
}

module.exports = {
  mode: 'universal',

  srcDir: 'app/',

  router: {
    ...routerConfig
  },

  render: {
    /**
     * compression を通すと API Gateway がレスポンスを返せないので
     * なにもしないミドルウェアを定義しておく
     */
    compressor: (req, res, next) => {
      next()
    }
  },

  /*
   ** Headers of the page
   */
  head: {
    title: 'Pastory.me',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'google-site-verification', content: 'rSFwhJ1TfgIONg-kyQBbcS5_Zvinndnj7winM5jOvhc' },
      { hid: 'description', name: 'description', content: 'Pastory.meは誰でも簡単に使える日記サービスです。' },
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
      { hid: 'twitter:image', name: 'twitter:image', content: 'https://s3-ap-northeast-1.amazonaws.com/pastory-static-assets/static/icon.png' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'https://s3-ap-northeast-1.amazonaws.com/pastory-static-assets/static/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },
  /*
   ** Customize the progress bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: ['~/assets/style/app.styl'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/firebase', '~/plugins/vuetify'],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    ['@nuxtjs/google-analytics', { id: 'UA-132062811-1' }]
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: ENV.AXIOS_BASE_URL
  },

  /*
   ** Build configuration
   */
  build: {
    transpile: [/^vuetify/],
    plugins: [
      new VuetifyLoaderPlugin()
    ],
    publicPath: 'https://s3-ap-northeast-1.amazonaws.com/pastory-static-assets/_nuxt/', // synced by serverless-s3-sync
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // // Run ESLint on save
      // if (ctx.isDev && ctx.isClient) {
      //   config.module.rules.push({
      //     enforce: 'pre',
      //     test: /\.(js|vue)$/,
      //     loader: 'eslint-loader',
      //     exclude: /(node_modules)/,
      //     options: {
      //       fix: true
      //     }
      //   })
      // }
    }
  }
}
