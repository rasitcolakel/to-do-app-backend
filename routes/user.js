const { Router } = require("express");
const router = new Router();
const checkToken = require("../middlewares/jwt");
const schemas = require("../middlewares/schemas");
const joiValidator = require("../middlewares/joiValidator");
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.get("/users", async (req, res) => {
  const user = await User.find();
  res.json(user);
});
router.post("/login", joiValidator(schemas.login), async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = user.generateAuthToken();
      res.send({ message: "Login successfully", token: token });
    } else {
      res.status(401).send({ message: "Email or password are incorrect" });
    }
  } else {
    res.status(404).send({ message: "There is no user with that email" });
  }
});

router.post("/register", joiValidator(schemas.register), async (req, res) => {
  const checkIfUserRegistered = await User.findOne({
    email: req.body.email,
  });
  if (checkIfUserRegistered !== null) {
    res.status(409).send({ message: "This email is already registered" });
  } else {
    try {
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(req.body.password, salt);
      const user = new User({
        fullName: req.body.fullName,
        email: req.body.email,
        password: password,
      });
      await user.save();
      res.send({ message: "Registration successfully" });
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  }
});
module.exports = router;
