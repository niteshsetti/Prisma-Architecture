import Koa from 'koa';
import bodyParser from 'koa-body';
import json from 'koa-json';
import cors from 'koa-cors';
import { router } from './routers/router';
import { serverport } from './utilities/app_constants';const app = new Koa();
app.use(bodyParser());
app.use(cors()).use(json());
app.use(router.routes()).use(router.allowedMethods())

app.listen(serverport,() => console.log(`Server Started on ${serverport}  port`));
