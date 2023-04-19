const express = require("express");

const app = express();
const port = 5000;

const { User } = require("./models/User");
const bodyPaser = require("body-parser");

app.use(bodyPaser.urlencoded({ extended: true }));
app.use(bodyPaser.json());

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

app.post("/resiger", (req, res) => {
  //회원가입할떄 필요한 정보들을 clinet에서 가져오면
  //그것들을 데이터 베이스에 넣어준다.

  const user = new User();
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));
