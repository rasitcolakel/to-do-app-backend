const mongoose = require("mongoose");

module.exports = (req, res, next) => {
  const isValid = mongoose.Types.ObjectId.isValid(req.params.id);

  if (!isValid)
    return res
      .status(404)
      .send({ message: "No boook with given id was not found" });

  next();
};
