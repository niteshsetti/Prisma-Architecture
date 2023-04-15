const sendResponse = (ctx: any, status: any, data: any) => {
    ctx.status = status;
    ctx.body = { data:data };
}

const sendError = (ctx:any, status: any, message: any) => {
    ctx.status = status;
    ctx.body = { error:message };
}

module.exports = {sendResponse,sendError}