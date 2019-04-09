const AutoPrefixer = require('autoprefixer');                     //  作为post-css-loader的插件为css代码增加兼容性的浏览器厂商前缀

module.exports = {
  plugins: [
    AutoPrefixer({
      browsers: ['CHROME >= 60']
    })
  ]
};
