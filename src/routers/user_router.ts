import  Router = require('koa-router');
import { getUsers, getUserById, createUser } from "../controllers/user_controller";

const { StatusCodes }  = require('http-status-codes');
const { sendResponse, sendError } = require('../utilities/response');

export const userRoutes: Router = new Router()

userRoutes.get("/all/users", async (ctx) => {
    try {
        const users = await getUsers();
        sendResponse(ctx, StatusCodes.OK, users);
    }
    catch (err) {
        sendError(ctx, StatusCodes.SERVER_ERROR, err.message);
    }
});
userRoutes.get("/:id", async (ctx) => {
    try {
        const user = await getUserById(ctx.params.id);
        sendResponse(ctx, StatusCodes.OK, user);
    }
    catch (err) {
        sendError(ctx, StatusCodes.NOT_FOUND, err.message);
    }
});
userRoutes.post("/", async (ctx) => {
    try {
        const { username } = ctx.request.body;
        const user = await createUser(username);
        sendResponse(ctx, StatusCodes.CREATED, user);
    }
    catch (err) {
        sendError(ctx, StatusCodes.NOT_FOUND, err.message);
    }
});

