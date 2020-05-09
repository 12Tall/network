/**
 * 配置文件
 */

module.exports = {
    // 过滤IP
    ip_array: ['localhost', '192.168.142.1'],

    // mariadb 连接池
    my_pool: {
        host: 'localhost',
        port: 3306,
        user: 'usr',
        password: 'password',
        database: 'my_db',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    },

    // session, 基本按默认配置即可
    session: {
        key: 'koa.sess', /** (string) cookie key (default is koa.sess) */
        maxAge: 5000, //  86400000,
    }
}