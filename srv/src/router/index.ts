import KoaRouter from "koa-router";
import login from "./api/login";
import hct from "./api/hct";
import admin from "./api/admin";
import department from "./api/admin/department";

const router = new KoaRouter();


router.get("/", async (ctx, res) => {
    ctx.response.body = "Hello World!"
});

router.use('/api/login', login.routes(), login.allowedMethods());
router.use('/api/hct', hct.routes(), hct.allowedMethods());
router.use('/api/admin', admin.routes(), admin.allowedMethods());


export default router;
const routes: any[] = [];
export function PushRoute(route: any) {
    routes.push(route);
}
export function GetRoute() {
    return routes;
}

