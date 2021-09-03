const { Router } = require("express");
const router = new Router();
const schemas = require("../middlewares/schemas");
const joiValidator = require("../middlewares/joiValidator");
const Todo = require("../models/Todo");
const isValidID = require("../middlewares/isValidID");

router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find({ author: req.user._id });
    res.send(todos);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
router.post("/", joiValidator(schemas.newTodo), async (req, res) => {
  try {
    const todo = new Todo({
      title: req.body.title,
      author: req.user._id,
    });
    await todo.save(function (err, obj) {
      if (err) res.send({ error: err.message });
      res.send(obj);
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
router.put(
  "/:id",
  joiValidator(schemas.updateTodo),
  isValidID,
  async (req, res) => {
    try {
      const todo = await Todo.findByIdAndUpdate(
        req.params.id,
        { title: req.body.title, status: req.body.status },
        {
          new: true,
        }
      );
      res.send(todo);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  }
);

router.delete("/all", async (req, res) => {
  try {
    const todo = await Todo.deleteMany({ author: req.user._id });
    res.send({ message: "Deleted Successfully" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.delete("/:id", isValidID, async (req, res) => {
  try {
    const todo = await Todo.findByIdAndRemove(req.params.id);
    res.send(todo);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
