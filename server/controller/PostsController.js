const sizeOf = require('image-size')
const Post = require('../models/post')
const User = require('../models/user')

module.exports = {
  post: (req, res) => {
    const author = req.body.id
    const { filename, size } = req.files.img[0]
    const tags = req.body.tags.split(',')
    const _data = sizeOf('./server/uploads/posts/' + filename)
    const { width, height } = _data
    const format = _data.type

    newPost = {
      author,
      tags,
      data: {
        filename,
        size,
        resolution: { width, height },
        format
      }
    }
    const addPostOnUser = post => {
      return User.addPost(author, post, (err, result) => {
        const promise = new Promise((resolve, reject) => {
          console.log("promise")
          if (err) {
            console.log(err)
            reject(err)
          } else if (!result) {
            console.log('No result')
            reject('no result')
          } else {
            console.log(result)
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
