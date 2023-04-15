import  Router = require('koa-router');
import { createCategory } from "../controllers/category_controller";

const { StatusCodes }  = require('http-status-codes');
const { sendResponse, sendError } = require('../utilities/response');

export const categoryRoutes: Router = new Router()

categoryRoutes.post("/createcategory", async (ctx) => {
    try {
        const { name, post_id } = ctx.request.body;
        const catgegory = await createCategory(name,post_id);
        sendResponse(ctx, StatusCodes.CREATED, catgegory);
    }
    catch (err) {
        sendError(ctx, StatusCodes.NOT_FOUND, err.message);
    }
});