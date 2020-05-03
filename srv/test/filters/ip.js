const config = require('../config');
async function filter(ctx,next){
    console.log('call ip filter');
    if(config.ip_array.indexOf(ctx.hostname)<0){
        var err = `${ctx.host} is not allowed to access`;
        ctx.throw(403,err);
    }

    await next();
    console.log('ip filter return')
}

module.exports = {filter}