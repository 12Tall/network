import Koa from 'koa'
import router from './router'

const app = new Koa();

// response
app.use(router.routes());

app.listen(3000);

console.log("http://localhost:3000")