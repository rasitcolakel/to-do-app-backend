const joiValidator = (schema, type = "body") => {
  return (req, res, next) => {
    const { error } = schema.validate(type === "body" ? req.body : req.params, {
      abortEarly: false,
    });
    const valid = error == null;
    if (valid) {
      next();
    } else {
      res.status(400).json({
        message: "Missing parameters",
        data: error.details.map((x) => ({
          message: x.message,
        })),
      });
    }
  };
};

module.exports = joiValidator;
