const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Tag = new Schema(
  {
    word: { type: String, required: true, uppercase: true }
  },
  { capped: { max: 100000, size: 2 * 20 * 100000 } }
)

Tag.statics.push = function(word) {
  return new this({ word }).save()
}

Tag.statics.getAll = function() {
  return this.find().exec()
}

module.exports = mongoose.model('Tag', Tag)
