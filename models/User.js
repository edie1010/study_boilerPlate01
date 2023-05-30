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
        console.log(hash);
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
    console.log(plainPassword);
    console.log(this.password);
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

const User = mongoose.model("User", userSchema);

module.exports = { User };
