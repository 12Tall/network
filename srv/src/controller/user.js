const { service,dbpool } = require('@src/helpers');

// 这里增加一个Controller 装饰器，应该能保证接口的唯一性
class User {



    // 这里也可以不传入ctx，但是传入的话会更灵活
    // 传入上下文的话，会不会造成项目耦合严重
    @service('用户', '123')
    static async add(ctx, next) {
        let [res, field] = await dbpool.mysql.execute(`SELECT 1 FROM user WHERE id =2 LIMIT 1`);
        console.log(res[0]);
        console.log('添加用户');
        ctx.body = 'user';
    }
}

module.exports = User;