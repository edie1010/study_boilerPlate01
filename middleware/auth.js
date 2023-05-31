const { User } = require("../models/User.js");

let auth = (req, res, next) => {
  // 인증 처리를 하는 곳
  // 클라이언트 쿠키에서 토큰을 가져온다.

  //토큰을 복호화한 후 유저를 찾는다
  //   User.findByToken(token, (err, user) => {
  //     if (err) throw err;
  //     if (!user) return res.json({ isAuth: false, error: ture });

  //     req.token = token;
  //     req.user = user;
  //     next();
  //   }).then();
  //===============================================================
  let token = req.cookies.x_auth;

  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });

    req.token = token;
    req.user = user;
    next();
  });

  //   try {
  //     let token = req.cookies.x_auth;
  //     const user = User.findByToken(token);
  //     res.user = user;
  //     res.token = token;
  //     res.status(200).send({ success: "성공이야이말이야.." });
  //     return next();
  //   } catch (err) {
  //     res.status(401).send();
  //   }

  // 유저가 있으면 인증 성공
  // 유저가 없으면 인증 실패
};

module.exports = { auth };
