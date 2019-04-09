const path = require('path');
// const ip = '0.0.0.0';
const ip = require('ip').address();
const port = 8080;
const rootPath = path.resolve(__dirname, '..');

module.exports = {
    ip,
    port,
    publicPath: '/vueJs/',
    rootPath,
    srcPath: path.join(rootPath, 'src/'),
    distPath: path.join(rootPath, 'dist/')
};
