const sizeOf = require('image-size')
const Post = require('../models/post')
const User = require('../models/user')

module.exports = {
  getAll: (req, res) => {
    const respond = payload => {
      res.json({
        success: true,
        posts: payload
      })
    }

    const onError = error => {
      res.json({
        message: error.message
      })
    }

    Post.findAll()
      .then(respond)
      .catch(onError)
  },

  uploadPost: (req, res) => {
    const id = req.body.authorId
    const name = req.body.authorName
    const { filename, size } = req.files.img[0]
    let tags = req.body.tags.split(',')
    const _data = sizeOf('./server/uploads/posts/' + filename)
    const { width, height } = _data
    const format = _data.type

    if (!tags[0]) tags = []

    newPost = {
      author: {
        id,
        name
      },
      tags,
      data: {
        filename,
        size,
        resolution: { width, height },
        format
      }
    }
    const addPostOnUser = post => {
      return User.addPost(id, post, (err, result) => {
        const promise = new Promise((resolve, reject) => {
          if (err) {
            console.log(err)
            reject(err)
          } else if (!result) {
            console.log('No result')
            reject('no result')
          } else {
            resolve()
          }
        })
        return promise
      })
    }

    const respond = () => {
      res.json({ success: true })
    }

    const onError = err => {
      if (err) {
        console.error(err)
        res.json({ result: 0 })
      }
    }

    Post.create(newPost)
      .then(addPostOnUser)
      .then(respond)
      .catch(onError)
  }
}
