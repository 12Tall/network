/**
 * 主要实现一些Babel 转码工作
 */

require('@babel/register')
// 因为引入顺序的问题、此文件不能使用别名
require('./src/main.js')