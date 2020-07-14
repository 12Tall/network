import KoaRouter from 'koa-router'
import { InsertDepartment, InsertRootDepartment, GetAllDepartments, RemoveDepartment } from '../../../controller/admin/department_ctrl';

const department = new KoaRouter();

department.all('/add', async (ctx) => {
    let params = ctx.request.body;
    ctx.body = await InsertDepartment(params.name, params.pid);
});
department.all('/addroot', async (ctx) => {
    let params = ctx.request.body;
    ctx.body = await InsertRootDepartment(params.name);
});
department.all('/getall', async (ctx) => {
    let params = ctx.request.body;
    ctx.body = await GetAllDepartments();
});
department.all('/del/:id', async (ctx) => {
    let params = ctx.params;
    ctx.body = await RemoveDepartment(params.id);
});

export default department;