module.exports = {
  devServer: {
       proxy: 'http://192.168.88.73:8080/'
   },
  lintOnSave: false,
  runtimeCompiler: true,
  publicPath: '/'
}
