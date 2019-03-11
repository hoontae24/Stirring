const sizeOf = require('image-size')
const Post = require('../models/post')
const User = require('../models/user')

module.exports = {
  deleteOne: (req, res) => {
    const { id } = req.params

    const deletePostOnUser = post => {
      return User.deletePost(post)
    }

    const respond = post => {
      res.json({
        success: true,
        post
      })
    }

    const onError = error => {
      res.json({ message: error.message })
    }

    Post.deleteOne(id)
      .then(deletePostOnUser)
      .then(respond)
      .catch(onError)
  },
  update: (req, res) => {
    const { id } = req.params
    const post = req.body

    const respond = () => {
      res.json({
        success: true
      })
    }

    const onError = error => {
      res.json({ message: error.message })
    }

    Post.updateOneById(id, post)
      .then(respond)
      .catch(onError)
  },

  getByIds: (req, res) => {
    const { id } = req.params
    const ids = id.split(',')

    const respond = post => {
      res.json({
        success: true,
        post
      })
    }

    const onError = error => {
      res.json({ message: error.message })
    }

    Post.findById(ids)
      .then(respond)
      .catch(onError)
  },

  getAll: (req, res) => {
    const mode = req.query

    const respond = posts => {
      res.json({
        success: true,
        posts
      })
    }

    const onError = error => {
      res.json({ message: error.message })
    }

    Post.findAll(mode)
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

    const onError = error => {
      res.json({ message: error.message })
    }

    Post.create(newPost)
      .then(addPostOnUser)
      .then(respond)
      .catch(onError)
  }
}
