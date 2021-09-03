const mongoose = require("mongoose");

const uri =
  "mongodb+srv://admin:j9WU7MQ0gT9H4yBH@cluster0.pijyl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
module.exports = () => {
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Db connect!"));
};
