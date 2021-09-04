const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
var cors = require("cors");

app.use(express.json());
app.use(cors({ origin: "*" }));
require("dotenv").config();
require("./start-up/db")();
require("./start-up/router")(app);
app.get("/", function (req, res) {
  res.send({ title: "welcome" });
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
