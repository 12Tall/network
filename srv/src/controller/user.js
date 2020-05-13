const { service, dbpool, Encrypt } = require('@src/helpers');

// 这里增加一个Controller 装饰器，应该能保证接口的唯一性
class User {



    // 这里也可以不传入ctx，但是传入的话会更灵活
    // 传入上下文的话，会不会造成项目耦合严重
    @service()
    static async add(ctx, next) {
        let [res, field] = await dbpool.mysql.execute(`SELECT 1 FROM user WHERE id =2 LIMIT 1`);
        let s = Encrypt.AES.en(123);
        console.log(s);
        console.log(Encrypt.AES.de(s));

        console.log('添加用户');
        ctx.body = 'user';
    }

    @service()
    static async update(ctx, next) {
        console.log('123')
    }
}

module.exports = User;