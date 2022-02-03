const express = require("express");
const Todo = require("./models/todo");
const mongoose = require("mongoose");
var cors = require("cors");

app = express();

app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/ToDoList", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log(err));

app.get("/todos", (req, res) => {
  Todo.find({}).then((data) => {
    res.json(data);
  });
});

app.post("/todos", (req, res) => {
  const newTodo = new Todo();
  newTodo.text = req.body.text;
  newTodo.isCompleted = req.body.isCompleted;
  newTodo.save().then(() => console.log("To-do added successfully"));
});

app.put("/todos", (req, res) => {
  Todo.updateOne(
    { _id: req.body._id },
    { isCompleted: req.body.isCompleted }
  ).then(() => res.send("To-do updated successfully"));
});

app.delete("/todos", (req, res) => {
  console.log("To Be Deleted: ", req.body);

  const toBeDeleted = req.body;

  toBeDeleted.forEach((todo) => {
    Todo.deleteOne({ _id: todo._id }).then(() =>
      console.log("Todos deleted successfully!")
    );
  });
});

app.listen(5000, () => console.log("Server running at port 5000"));
