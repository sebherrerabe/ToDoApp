const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { Task, TaskSchema } = require("./model/task");

dotenv.config();

mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected with Setthebar DB"))
  .catch((err) => console.log(err));

const express = require("express");
const app = express();
const cors = require("cors");
console.log("App listen at port 5000");
app.use(express.json());
app.use(cors());
app.get("/", (req, resp) => {
  resp.send("App is Working");
});

app.post("/save", async (req, res) => {
  const { id, text, completed, index } = req.body;
  try {
    const task = new Task({
      text: text,
      completed: completed,
      id: id,
      index: index,
    });
    let result = await task.save();
    result = result.toObject();
    if (result) {
      console.log(result.id + " saved");
    }
    res.send(result);
  } catch (e) {
    res.send("Something Went Wrong");
  }
});

app.post("/update", async (req, res) => {
  const { id, text, completed, index } = req.body;
  try {
    let result = await Task.findOneAndUpdate(
      { id: id },
      { text: text, completed: completed, index: index }
    );
    result = result.toObject();
    if (result) {
      console.log(result.id + " updated");
    }
    res.send(result);
  } catch (e) {
    res.send("Something Went Wrong");
  }
});

app.post("/delete", async (req, res) => {
  const { id } = req.body;
  try {
    let result = await Task.findOneAndDelete({ id: id });
    result = result.toObject();
    if (result) {
      console.log(result.id + " deleted");
    }
    res.send(result);
  } catch (e) {
    res.send("Something Went Wrong");
  }
});

app.get("/get", async (req, res) => {
  try {
    let result = await Task.find();
    result = result.map((item) => item.toObject());
    console.log(result.length + " tasks found");
    res.send(result);
  } catch (e) {
    res.send("Something Went Wrong");
  }
});

app.listen(5000);
