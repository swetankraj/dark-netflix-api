const mongoose = require("mongoose");
const validator = require("validator"); //https://github.com/validatorjs/validator.js
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user must have a name."],
  },
  email: {
    type: String,
    required: [true, "A user must have an email address."],
    unique: true,
    lowercase: true, //converts to lowercase before saving
    validate: [validator.isEmail, "Email is not valid."],
  },
  password: {
    type: String,
    required: [true, "A user must set a password."],
    minlength: 9,
    select: false, //won't show password in any of output / projection.
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (passConfirm) {
        return passConfirm === this.password;
      },
      message: "Provided password do not match.",
    },
  },
  photo: String,
  role: {
    type: String,
    enum: ["admin", "contr", "user"],
    default: "user",
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    //admin can delete a particular user, but default will make it false and will not be visible in search results.
    type: Boolean,
    default: true,
    select: false,
  },
});

//* AUTH MIDDLEWARE
userSchema.pre("save", function (next) {
  if (this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 2000;
  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 13);
  this.passwordConfirm = undefined;
  next();
});

//* QUERY MIDDLEWARE
//pre-hook for all find operations in this usermodel.
userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
});

//* INSTANCE METHODS
userSchema.methods.correctPassword = async function (candidatePass, userPass) {
  return await bcrypt.compare(candidatePass, userPass);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return changedTimestamp > JWTTimestamp;
  }
  // FASLE means not changed
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  console.log(resetToken, this.passwordResetToken);
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
