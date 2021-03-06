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
    tags: { type: [String], uppercase: true },
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
  if (condition.authorId) posts = this.find({ 'author.id': condition.authorId })
  if (condition.likes) posts = this.find({ _id: condition.likes })
  if (condition.search)
    posts = this.find({ tags: { $in: condition.search.toUpperCase() } })

  if (condition.sort === 'popularity') posts.sort({ likes: -1 })
  else if (condition.sort === 'latest') posts.sort({ createdAt: -1 })

  const count = JSON.parse(condition.count)
  return posts
    .limit(count.new * 1)
    .skip(count.old * 1)
    .exec()
  // return posts.limit(2).skip(2).exec()
}

Post.statics.findByAuthorId = function(authorId) {
  return this.find({ 'author.id': authorId }).exec()
}

Post.statics.findOneById = function(_id) {
  return this.findOne({ _id }).exec()
}

Post.statics.findById = function(id) {
  return this.find({ _id: id }).exec()
}

Post.statics.updateOneById = function(_id, post) {
  return this.findOneAndUpdate({ _id }, post).exec()
}

Post.statics.deleteOne = function(_id) {
  return this.findOneAndDelete({ _id }).exec()
}

Post.statics.deleteByAuthorId = function(authorId) {
  return this.deleteMany({ 'author.id': authorId }).exec()
}

Post.statics.decLikes = function(likes) {
  return this.update({ _id: likes }, { $inc: { likes: -1 } }).exec()
}
module.exports = mongoose.model('Post', Post)
