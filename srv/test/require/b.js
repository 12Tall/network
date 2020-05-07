const a = require('./a')
a.inc();
a.inc();
a.inc();
a.inc();

module.exports = { get: a.get }