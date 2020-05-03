const config = require('../config')
async function ip(ctx, next){
    if(config.ip_array.indexOf(ctx.hostname)<0){
        ctx.throw(403,"destination is unreachable")
    }
    await next();
}

module.exports = {ip}
