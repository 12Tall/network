/**
 * 过滤器
 * 因为需要手工指定过滤器的顺序
 * 所以没有添加自动注册
 */
var dic = require('require-directory')
module.exports = dic(module)