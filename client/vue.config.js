const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    ignoreWarnings: [
      {
        message: /export 'default' \(imported as 'style0'\) was not found/
      }
    ],
    infrastructureLogging: {
      level: 'error'
    }
  }
})
