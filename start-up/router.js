const todos = require("../routes/todos");
const user = require("../routes/user");
const checkToken = require("../middlewares/jwt");

module.exports = (app) => {
  app.use("/todos", [checkToken, todos]);
  app.use("/", user);
};
