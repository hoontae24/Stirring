const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Post = new Schema({
  author: {
    id: { type: String, required: true },
    name: { type: String, required: true }
  },
  data: {
    filename: { type: String, required: true },
    size: Number,
    resolution: { width: Number, height: Number },
    format: String,
    location: String
  },
  tags: [String],
  likes: Number,
  downloads: Number,
  views: Number,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
})

Post.statics.create = function(post) {
  const newPost = new this(post)
  return newPost.save()
}

Post.statics.findAll = function() {
  return this.find().exec()
}

Post.statics.findOneById = function() {
  return this.find()
}

Post.statics.updateOneById = function() {}

Post.statics.deleteOneById = function() {}

module.exports = mongoose.model('Post', Post)
