const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Collection = new Schema(
  {
    title: { type: String, required: true },
    posts: { type: [String], defualt: [] },
    author: {
      id: { type: String, required: true },
      name: { type: String, required: true }
    },
    tags: { type: [String], default: [] }
  },
  { timestamps: true }
)

Collection.statics.create = function(title, author) {
  return new this({ title, author }).save()
}

Collection.statics.findAll = function() {
  return this.find().exec()
}

Collection.statics.findByAuthor = function(authorId) {
  return this.find({ 'author.id': authorId }).exec()
}

Collection.statics.findByIds = function(ids) {
  return this.find({ _id: ids }).exec()
}

Collection.statics.findByWords = function(word) {
  return this.find({
    $or: [
      { title: { $regex: word, $options: 'i' } },
      { 'author.name': { $regex: word, $options: 'i' } }
    ]
  }).exec()
}

Collection.statics.updateOne = function(collection) {
  return this.findOneAndUpdate({ _id: collection._id }, collection).exec()
}

Collection.statics.deleteOne = function(collection) {
  return this.findOneAndDelete({ _id: collection._id }).exec()
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

Collection.statics.deleteCollections = function(collections) {
  return this.deleteMany({ _id: collections }).exec()
}

module.exports = mongoose.model('Collection', Collection)
