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
const Auth = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, trim: true }
  },
  { timestamps: true }
)

Auth.statics.create = function(user) {
  const hashPassword = crypto
    .createHmac('sha1', config.secret)
    .update(user.password)
    .digest('base64')
  user.password = hashPassword
  const newUser = new this({
    email: user.email,
    password: user.password
  })
  return newUser.save()
}

Auth.statics.findOneByEmail = function(email) {
  return this.findOne({ email }).exec()
}

Auth.methods.verify = function(password) {
  const hashPassword = crypto
    .createHmac('sha1', config.secret)
    .update(password)
    .digest('base64')
  return this.password === hashPassword
}

Auth.statics.addPost = function(id, post, cb) {
  this.updateOne({ _id: id }, { $push: { posts: post._id } }, cb)
}

Auth.statics.createCollection = function(collection) {
  return this.findOneAndUpdate(
    { _id: collection.author },
    { $push: { collections: collection._id } }
  ).exec()
}

Auth.statics.update = function(_id, user) {
  delete user.password
  return this.findOneAndUpdate({ _id }, user).exec()
}

module.exports = mongoose.model('Auth', Auth)
