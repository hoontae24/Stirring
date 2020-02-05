const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Token = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    token: { type: String, required: true, trim: true }
  },
  { timestamps: true }
)

Token.statics.setTokenOnEmail = function(email, token) {
  return this.findOneAndUpdate(
    { email },
    { $set: { token } },
    { upsert: true }
  ).exec()
}

Token.statics.getTokenOnEmail = function(email) {
  return this.findOne({ email }).exec()
}

Token.statics.completeOnEmail = function(email) {
  return this.findOneAndUpdate(
    { email },
    { $set: { token: null } },
    { upsert: true }
  ).exec()
}

module.exports = mongoose.model('Token', Token)
