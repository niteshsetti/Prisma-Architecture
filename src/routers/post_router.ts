import  Router = require('koa-router');
import { createPost } from "../controllers/post_controller";

const { StatusCodes }  = require('http-status-codes');
const { sendResponse, sendError } = require('../utilities/response');

export const postRoutes: Router = new Router()

postRoutes.post("/createpost", async (ctx) => {
    try {
        const { title, content, user_id } = ctx.request.body;
        const posts = await createPost(title,content,user_id);
        sendResponse(ctx, StatusCodes.CREATED, posts);
    }
    catch (err) {
        sendError(ctx, StatusCodes.NOT_FOUND, err.message);
    }
});
