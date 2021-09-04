const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI || "mongodb://localhost";
module.exports = () => {
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Db connect!"));
};
