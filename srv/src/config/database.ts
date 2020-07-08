import { ConnectionOptions } from "typeorm";
import path from 'path'

const databases: ConnectionOptions[] = [{
    name: 'my_db',
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'usr',
    password: 'password',
    database: 'my_db',
    entities: [path.join(__dirname, "/../entity/my_db/") + "*{.js,.ts}"],  // __dirname 永远指向当前目录
    logging: true, // 开启所有数据库信息打印
    logger: 'advanced-console', // 高亮字体的打印信息
    extra: {
        connectionLimit: 10, // 连接池最大连接数量, 查阅资料 建议是  core number  * 2 + n 
    },
    synchronize: true,  // 自动创建表
}, {
    name: 'gogs',
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'usr',
    password: 'password',
    database: 'gogs',
    entities: [path.join(__dirname, "/../entity/gogs/") + "*{.js,.ts}"],
    logging: true, // 开启所有数据库信息打印
    logger: 'advanced-console', // 高亮字体的打印信息
    extra: {
        connectionLimit: 10, // 连接池最大连接数量, 查阅资料 建议是  core number  * 2 + n 
    },
    // synchronize: true,  // 自动创建表
}, {
    name: 'hct',
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'hct',
    password: 'password',
    database: 'hct',
    entities: [path.join(__dirname, "/../entity/hct/") + "*{.js,.ts}"],
    logging: true, // 开启所有数据库信息打印
    logger: 'advanced-console', // 高亮字体的打印信息
    extra: {
        connectionLimit: 10, // 连接池最大连接数量, 查阅资料 建议是  core number  * 2 + n 
    },
    // synchronize: true,  // 自动创建表
}];

export default databases;