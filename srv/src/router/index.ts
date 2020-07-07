import KoaRouter from "koa-router";
import login from "./api/login";

const router = new KoaRouter();


router.get("/", async (ctx, res) => {
    ctx.response.body = "Hello World!"
});

router.use('/api', login.routes(), login.allowedMethods());


export default router;