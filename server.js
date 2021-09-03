const express = require("express");
const app = express();
const port = 3003;
var cors = require("cors");

app.use(express.json());
app.use(cors());

require("dotenv").config();
require("./start-up/db")();
require("./start-up/router")(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
