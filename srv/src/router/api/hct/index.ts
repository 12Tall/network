import KoaRouter from 'koa-router'
import experiment from './experiment';
import specimen from './specimen';
import material from './material';

const hct = new KoaRouter();

hct.use('/experiment', experiment.routes(), experiment.allowedMethods());
hct.use('/specimen', specimen.routes(), specimen.allowedMethods());
hct.use('/material', material.routes(), material.allowedMethods());


export default hct;