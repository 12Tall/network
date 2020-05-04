
const config = require('../config'),
mysql = require('mysql2/promise');

let pool = mysql.createPool(config.my_pool);

module.exports={
    pool
}