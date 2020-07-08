import KoaRouter from "koa-router";
import GetSpecimentsByPage from "../../../controller/hct/specimen_ctrl";


const specimen = new KoaRouter();
specimen.all('/:size/:page/:keyword', async (ctx) => {
    let params = ctx.params;
    ctx.body = await GetSpecimentsByPage(params.size > 0 ? params.size : 10, params.page > 0 ? params.page : 1, params.keyword);
});
specimen.all('/:size/:page', async (ctx) => {
    let params = ctx.params;
    ctx.body = await GetSpecimentsByPage(params.size > 0 ? params.size : 10, params.page > 0 ? params.page : 1, "");
});

export default specimen;