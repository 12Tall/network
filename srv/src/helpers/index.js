/**
 * 常用工具：数据库连接池
 */
const config = require('@src/config'),
    mysql = require('mysql2/promise');

const dbpool = {
    mysql: mysql.createPool(config.my_pool)
}


// 中间件函数的装饰器
// 需要多查一次装饰器
function service(name, guid) {
    // if (name && guid) {
    return async function (target, name, descriptor) {
        let ctrl = target.name,
            srv = name;

        console.log(`接口初始化时，检查{${ctrl},${srv}}是否已经注册`);

        let [rows, field] = await dbpool.mysql.query(`INSERT INTO service (controller, service) SELECT * FROM (SELECT  ? AS controller,? AS service) AS temp WHERE NOT EXISTS (SELECT controller, service FROM service WHERE controller = ? AND service = ? LIMIT 1);`,
            [ctrl, srv, ctrl, srv]);

        let origin = descriptor.value;
        descriptor.value = async (ctx, next) => {
            console.log('执行接口时鉴别权限');
            await origin(ctx, next);
        }
        Object.defineProperty(target, name, descriptor);

    }

    // } else {
    //     throw `缺少服务参数`
    // }
}

module.exports = {
    dbpool,
    service,
    Encrypt: require('./encrypt')
}