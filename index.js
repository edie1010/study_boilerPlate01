const express = require("express");

const app = express();
const port = 5000;

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://edie1010:abcd1234@cluster0.h5t31uw.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MOgoDb Good..."))
  .catch((err) => console.log("fail"));

app.get("/", (req, res) => res.send("hello World"));

app.listen(port, () => console.log(`Example app listening on port ${port}`));
