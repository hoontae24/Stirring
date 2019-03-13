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
const User = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, trim: true },
    name: { type: String, required: true },
    image: { type: String, default: 'face-default.png' },
    posts: [String],
    followings: [String],
    followers: [String],
    collections: [String],
    interests: { type: [String], uppercase: true },
    likes: [String]
  },
  { timestamps: true }
)

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
  return this.findOne({ email }).exec()
}

User.statics.findById = function(ids) {
  return this.find({ _id: ids })
    .select('-password')
    .exec()
}
User.statics.findOneByIdWithPW = function(id) {
  return this.findOne({ _id: id }).exec()
}

User.statics.findByWord = function(word) {
  return this.find({
    $or: [
      { name: { $regex: word, $options: 'i' } },
      { email: { $regex: word, $options: 'i' } },
      { interests: { $in: word[0].toUpperCase() } }
    ]
  }).exec()
}

User.statics.findAll = function() {
  return this.find().exec()
}

User.methods.verify = function(password) {
  const hashPassword = crypto
    .createHmac('sha1', config.secret)
    .update(password)
    .digest('base64')
  return this.password === hashPassword
}

User.statics.addPost = function(id, post, cb) {
  this.updateOne({ _id: id }, { $push: { posts: post._id } }, cb)
}

User.statics.deletePost = function(post) {
  return this.findOneAndUpdate(
    { _id: post.author.id },
    { $pull: { posts: post._id } }
  ).exec()
}

User.statics.createCollection = function(collection) {
  return this.findOneAndUpdate(
    { _id: collection.author.id },
    { $push: { collections: collection._id } }
  ).exec()
}

User.statics.deleteCollection = function(collection) {
  return this.findOneAndUpdate(
    { _id: collection.author.id },
    { $pull: { collections: collection._id } }
  ).exec()
}

User.statics.update = function(_id, user) {
  delete user.password
  return this.findOneAndUpdate({ _id }, user).exec()
}

User.statics.findOneProfileImageById = function(id) {
  return this.findOne({ _id: id }, 'image').exec()
}
User.statics.updateProfileImageById = function(id, filename) {
  return this.findOneAndUpdate(
    { _id: id },
    { $set: { image: filename } }
  ).exec()
}

User.statics.updatePassword = function(id, newPassword) {
  const hashPassword = crypto
    .createHmac('sha1', config.secret)
    .update(newPassword)
    .digest('base64')
  return this.findOneAndUpdate(
    { _id: id },
    { $set: { password: hashPassword } }
  ).exec()
}

User.statics.deleteOneByEmail = function(email) {
  return this.findOneAndDelete({ email }).exec()
}

module.exports = mongoose.model('User', User)
