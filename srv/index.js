/**
 * 主要实现一些Babel 转码工作
 */

require('@babel/register')
var sizeof = require('object-sizeof')
require('./test/require/c')

const d = require('./test/decorators')
var a = {
    "ttt":"sss",
    "sss":["sss","ttt"]
}
var b = a
console.log(sizeof(a),sizeof([b]),sizeof('😂'))
d.Clz.m1();
d.Clz.m1();
d.Clz.m1();
d.Clz.m1();
// let c = new d.Clz();
// c.m1();

// require('./entities/user')

// var route = require('./main');
