const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  timeCreated: {
    type: Date,
    default: Date.now(),
  },
  token: [
    {
      tokenID: { type: String },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
      expiration: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  todos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Todo" }],
});

UserSchema.methods.storeToken = async function (
  passwordResetToken,
  expirationDate
) {
  this.token.push({ tokenID: passwordResetToken, expiration: expirationDate });
  await this.save();
};

// UserSchema.methods.createTodo = async function (todoName) {
//     this.
// }

module.exports = mongoose.model("User", UserSchema);
