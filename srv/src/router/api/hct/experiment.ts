import KoaRouter from "koa-router";
import GetExprimentsByPage from "../../../controller/hct/experiment_ctrl";


const experiment = new KoaRouter();
experiment.all('/:size/:page/:keyword', async (ctx) => {
    let params = ctx.params;
    ctx.body = await GetExprimentsByPage(params.size > 0 ? params.size : 10, params.page > 0 ? params.page : 1, params.keyword);
});
experiment.all('/:size/:page', async (ctx) => {
    let params = ctx.params;
    ctx.body = await GetExprimentsByPage(params.size > 0 ? params.size : 10, params.page > 0 ? params.page : 1, "");
});

export default experiment;