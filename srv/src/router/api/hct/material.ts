import KoaRouter from "koa-router";
import GetMaterialsByPage from "../../../controller/hct/material_ctrl";


const material = new KoaRouter();
material.all('/:size/:page/:keyword', async (ctx) => {
    let params = ctx.params;
    ctx.body = await GetMaterialsByPage(params.size > 0 ? params.size : 10, params.page > 0 ? params.page : 1, params.keyword);
});
material.all('/:size/:page', async (ctx) => {
    let params = ctx.params;
    ctx.body = await GetMaterialsByPage(params.size > 0 ? params.size : 10, params.page > 0 ? params.page : 1, "");
});

export default material;