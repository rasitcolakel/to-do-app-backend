const mongoose = require("mongoose");

const uri = "mongodb://localhost";
module.exports = () => {
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Db connect!"));
};
