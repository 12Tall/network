import { ConnectionOptions } from "typeorm";
import path from 'path'
import Photo from '../entity/my_db/photo'
const databases: ConnectionOptions[] = [{
    name: 'my_db',
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'usr',
    password: 'password',
    database: 'my_db',
    entities: [path.join(__dirname, "/../entity/my_db/") + "*.ts"],
    logging: true, // 开启所有数据库信息打印
    logger: 'advanced-console', // 高亮字体的打印信息
    extra: {
        connectionLimit: 10, // 连接池最大连接数量, 查阅资料 建议是  core number  * 2 + n 
    },
    synchronize: true,  // 自动创建表
},];
export default databases;