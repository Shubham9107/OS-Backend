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

const producer_consumerSchema = {
  buffer_size: Number,
  producer: Number,
  consumer: Number,
};

const Pc = mongoose.model("producer_consumer", producer_consumerSchema);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/producer_consumer.html");
});

app.post("/pc", async (req, res) => {
  let NewPc = await new Pc({
    buffer_size: req.body.buffer_size,
    producer: req.body.producer,
    consumer: req.body.consumer,
  });
  NewPc.save();
  console.log(NewPc);
  res.redirect("/");
});

app.listen(5506);
