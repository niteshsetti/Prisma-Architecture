import  Router = require('koa-router');

import { userRoutes } from "../routers/user_router";
import { postRoutes } from '../routers/post_router';
import { categoryRoutes } from '../routers/categories_router';

export const router: Router = new Router();

router.use('/users', userRoutes.routes());
router.use('/posts', postRoutes.routes());
router.use('/categories', categoryRoutes.routes());