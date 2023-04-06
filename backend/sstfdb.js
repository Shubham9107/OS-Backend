const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const { string } = require("i/lib/util");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + ""));

mongoose
  .connect(
    "mongodb://127.0.0.1:27017/OSProject",
    { useNewUrlParser: true },
    { useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(() => {
    console.log("Something went wrong");
  });

const sstfSchema = {
  bitstream: String,
  intial: Number,
};

const Sstf = mongoose.model("sstf", sstfSchema);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/sstf.html");
});

app.post("/sstf", async (req, res) => {
  let NewSstf = await new Sstf({
    bitstream: req.body.bitstream,
    intial: req.body.intial,
  });
  NewSstf.save();
  console.log(NewSstf);
  res.redirect("/");
});

app.listen(5507);
