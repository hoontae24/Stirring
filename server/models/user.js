const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')
const config = require('../config')

/*
  #User Schema
  image: filename of profile images
  followings: Array of ID of Users
  followers: Array of ID of Users
  collections: Array of ID of collections
  interests: Array of tags
  likes: Array of ID of posts
*/
const User = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, trim: true },
  name: { type: String, required: true },
  image: { type: String, default: null },
  followings: [String],
  followers: [String],
  collections: [String],
  interests: [String],
  likes: [String],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
})

User.statics.create = function(user) {
  const hashPassword = crypto
    .createHmac('sha1', config.secret)
    .update(user.password)
    .digest('base64')
    user.password = hashPassword
  const newUser = new this(user)
  return newUser.save()
}

User.statics.findOneByEmail = function(email) {
  return this.findOne({
    email
  }).exec()
}

User.methods.verify = function(password) {
  const hashPassword = crypto
    .createHmac('sha1', config.secret)
    .update(password)
    .digest('base64')
  return this.password === hashPassword
}

module.exports = mongoose.model('User', User)
