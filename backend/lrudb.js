const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const { string } = require("i/lib/util");
const { pid } = require("process");
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

const lruSchema = {
  nof: String,
  seq: String
};

const lru = mongoose.model("lru", lruSchema);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/lru.html");
});

app.post("/lru", async (req, res) => {
  let NewLru = await new lru({
    nof: req.body.nof,
    seq: req.body.seq
  });
  NewLru.save();
  console.log(NewLru);
  res.redirect("/");
});

app.listen(5508);
