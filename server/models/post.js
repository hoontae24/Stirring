const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Post = new Schema(
  {
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
    likes: { type: Number, default: 0 },
    downloads: { type: Number, default: 0 },
    views: { type: Number, default: 0 }
  },
  { timestamps: true }
)

Post.statics.create = function(post) {
  const newPost = new this(post)
  return newPost.save()
}

Post.statics.findAll = function(condition) {
  let posts = this.find()
  if (condition.authorId) posts = this.find({'author.id': condition.authorId})
  if (condition.sort === 'popularity') posts.sort({ views: -1 })
  else if (condition.sort === 'latest') posts.sort({ createdAt: -1 })

  posts.limit(condition.count * 1)
  return posts.exec()
}

Post.statics.findOneById = function(_id) {
  return this.findOne({ _id }).exec()
}

Post.statics.updateOneById = function(_id, post) {
  return this.findOneAndUpdate({ _id }, post).exec()
}

Post.statics.deleteOneById = function() {}

module.exports = mongoose.model('Post', Post)
