const { pool } = require('./sql');


let create = "CREATE TABLE IF NOT EXISTS `users` ( \
	`uid` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT, \
	`first_name` VARCHAR(50) NULL DEFAULT NULL COMMENT '名', \
	`last_name` VARCHAR(50) NULL DEFAULT NULL COMMENT '姓', \
	`mail_addr` VARCHAR(50) NULL DEFAULT NULL COMMENT '邮箱', \
	`reg_from` VARCHAR(50) NULL DEFAULT 'local' COMMENT '来源：本地、其他认证方式', \
	`accnt_state` VARCHAR(50) NULL DEFAULT 'expired' COMMENT '用户状态', \
	PRIMARY KEY (`uid`) \
) \
ENGINE=InnoDB;"



async function create_table() {
    console.log('create table users ...')
    let conn = await pool.getConnection();
    try {
        await conn.beginTransaction();
        let res = await conn.execute(create);
        console.log(res);
        await conn.commit();
    } catch (error) {
        console.log(error)
    } finally {
        await conn.release();
    }
    console.log('table users created');
};

create_table();
