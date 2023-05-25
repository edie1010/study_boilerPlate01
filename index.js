const express = require("express");

const app = express();
const port = 5000;

const config = require("./config/key");
const { User } = require("./models/User");
const bodyPaser = require("body-parser");
//application/x-www-form-urlencoded 분석해서 가져오게끔 처리
app.use(bodyPaser.urlencoded({ extended: true }));
//application/json
app.use(bodyPaser.json());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MOgoDb Good..."))
  .catch((err) => console.log("fail"));

app.get("/", (req, res) => res.send("안녕하세요 허허허 피곤하다..."));

app.post("/register", (req, res) => {
  //회원가입할떄 필요한 정보들을 clinet에서 가져오면
  //그것들을 데이터 베이스에 넣어준다.

  const user = new User(req.body);

  // user.save((err, userInfo) => {
  //   if (err) return res.json({ success: false, err });
  //   return res.status(200).json({
  //     success: true,
  //   });
  // });

  const result = user
    .save()
    .then(() => {
      res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      res.json({ success: false, err });
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));
