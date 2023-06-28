const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

const config = require("./config/key");
const { User } = require("./models/User");
const bodyPaser = require("body-parser");
const cookieParser = require("cookie-parser");

//모든 도메인
app.use(cors());

//application/x-www-form-urlencoded 분석해서 가져오게끔 처리
app.use(bodyPaser.urlencoded({ extended: true }));
//application/json
app.use(bodyPaser.json());

app.use(cookieParser());

const mongoose = require("mongoose");
const { auth } = require("./middleware/auth");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MOgoDb Good..."))
  .catch((err) => console.log("fail"));

app.get("/", (req, res) => res.send("안녕하세요 허허허 피곤하다..."));

app.get("/api/hello", (req, res) => {
  res.send("안녕하세요");
});

app.post("/api/users/register", (req, res) => {
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

app.post("/api/users/login", async (req, res) => {
  //const user = new User(req.body);
  const user2 = await User.findOne({ email: req.body.email });
  if (!user2) {
    return res.json({
      loginSuccess: false,
      message: "제공된 이메일에 해당하는 유저가 없습니다",
    });
  }
  user2.comparePassword(req.body.password, (err, isMatch) => {
    if (!isMatch) {
      return res.json({ loginSuccess: false, message: "틀렸어" });
    }

    user2.genToken((err, user) => {
      if (err) return res.status(400).send(err);
      res
        .cookie("x_auth", user.token)
        .status(200)
        .json({ loginSuccess: true, userId: user._id });
    });
  });
});

app.get("/api/users/auth", auth, (req, res) => {
  //여기까지 미들웨어를 통과해 왔따는 얘기는 Authentication이 ture라는말.
  res.status(200).json({
    _id: req.user_.id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  // User.findOneAndUpdate(
  //   { _id: req.user._id },
  //   {
  //     token: "",
  //   },
  //   (err, user) => {
  //     if (err) return res.json({ success: false, err });
  //     return res.status(200).send({
  //       success: true,
  //     });
  //   }
  // );

  console.log("req", req);

  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      token: "",
    }
  )
    .then((user) => {
      res.status(200).send({
        success: true,
      });
    })
    .catch((err) => {
      res.json({ success: false, err });
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));
