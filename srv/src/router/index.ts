import KoaRouter from "koa-router";
import login from "./api/login";
import hct from "./api/hct";

const router = new KoaRouter();


router.get("/", async (ctx, res) => {
    ctx.response.body = "Hello World!"
});

router.use('/api/login', login.routes(), login.allowedMethods());
router.use('/api/hct', hct.routes(), hct.allowedMethods());


export default router;