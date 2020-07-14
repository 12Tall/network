import KoaRouter from 'koa-router'
import department from './department';
const admin = new KoaRouter();

admin.use('/department', department.routes(), department.allowedMethods());


export default admin;