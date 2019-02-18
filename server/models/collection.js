const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Collection = new Schema(
  {
    title: { type: String, required: true },
    posts: { type: [String], defualt: [] },
    author: { type: String, required: true }
  },
  { timestamps: true }
)

Collection.statics.create = function(title, userId) {
  return new this({ title, author: userId }).save()
}

Collection.statics.findByAuthor = function(author) {
  return this.find({ author }).exec()
}

Collection.statics.findOneAddPost = function(collection, post) {
  return this.findOneAndUpdate(
    { _id: collection._id },
    { $push: { posts: post._id } }
  ).exec()
}

Collection.statics.findOneSubtractPost = function(collection, post) {
  return this.findOneAndUpdate(
    { _id: collection._id },
    { $pull: { posts: post._id } }
  ).exec()
}

module.exports = mongoose.model('Collection', Collection)
