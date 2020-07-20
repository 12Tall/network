import KoaRouter from 'koa-router'
import department from './department';
import user from './user';
const admin = new KoaRouter();

admin.use('/department', department.routes(), department.allowedMethods());
admin.use('/user', user.routes(), user.allowedMethods());


export default admin;