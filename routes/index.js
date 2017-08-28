const Router = require("koa-router");

const apiRouter = new Router();

const app = require("../app/controllers/index");

apiRouter.post("/login", app.login);

module.exports = apiRouter;
