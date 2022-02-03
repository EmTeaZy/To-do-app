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
  .connect("mongodb+srv://tz:verymuch@cluster0.bibtx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log(err));

// Handling the GET request
app.get("/todos", (req, res) => {
  Todo.find({}).then((data) => {
    res.json(data);
  });
});

// Handling the POST request
app.post("/todos", (req, res) => {
  // Adding the recieved Todo to the database

  const newTodo = new Todo();
  newTodo.text = req.body.text;
  newTodo.isCompleted = req.body.isCompleted;
  newTodo.save().then(() => {
    // Upon success, we send the inserted Todo back to the front end
    Todo.find({ text: req.body.text }).then((todo) => {
      res.send(todo.at(-1));
    });
  });
});

// Handling the UPDATE request
app.put("/todos", (req, res) => {
  Todo.updateOne(
    { _id: req.body._id },
    { isCompleted: req.body.isCompleted }
  ).then(() => res.send("To-do updated successfully"));
});

// Handling the DELETE request
app.delete("/todos", (req, res) => {
  const toBeDeleted = req.body;
  toBeDeleted.forEach((todo) => {
    Todo.deleteOne({ _id: todo._id }).then(() =>
      console.log("Todo deleted successfully!")
    );
  });
  res.send("Todos deleted successfully!");
});

app.listen(5000, () => console.log("Server running at port 5000"));
