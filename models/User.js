const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlenght: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    maxlenght: 50,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  toketnExp: {
    type: Number,
  },
});

userSchema.pre("save", function (next) {
  var uesr = this;
  if (uesr.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(uesr.password, salt, function (err, hash) {
        if (err) return next(err);

        uesr.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.genToken = function (cb) {
  var user = this;
  var token = jwt.sign(user._id.toHexString(), "dddddd");
  user.token = token;
  console.log(user.token);
  user
    .save()
    .then((userInfo) => {
      return cb(null, userInfo);
    })
    .catch((err) => {
      return cb(err);
    });
};

userSchema.statics.findByToken = function (token, cb) {
  var user = this;

  jwt.verify(token, "dddddd", function (err, decode) {
    //유저아이디를 이용해서 유저를 찾은다음에
    //클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인

    user
      .findOne({ _id: decode, token: token })
      .then((user) => {
        console.log(user);
        cb(null, user);
      })
      .catch((err) => {
        cb(err);
      });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
