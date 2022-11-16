const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  assetsDir: 'src/assets',
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "@/assets/stylesheets/_variables.scss";
          @import "@/assets/stylesheets/_mixins.scss";
        `
      }
    }
  },

  pluginOptions: {
    i18n: {
      locale: 'nb',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableLegacy: true,
      runtimeOnly: false,
      compositionOnly: false,
      fullInstall: true
    }
  }
})
