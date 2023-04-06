const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const { string } = require("i/lib/util");
const { pid } = require("process");
const { response } = require("express");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + ""));

mongoose
  .connect(
    "mongodb://0.0.0.0:27017/OSProject",
    { useNewUrlParser: true },
    { useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(() => {
    console.log("Something went wrong");
  });

const srtnSchema = {
  pid: [Number],
  at: [Number],
  bt: [Number],
};

const SrtnSchema = mongoose.model("srtn", srtnSchema);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/srtn.html");
});

app.post("/srtn", async (req, res) => {
  let NewSrtn = await new SrtnSchema({
    pid: req.body.pid,
    at: req.body.at,
    bt: req.body.bt,
  });
  NewSrtn.save();
  console.log(NewSrtn);
  res.redirect("/");
});

app.listen(5505);
