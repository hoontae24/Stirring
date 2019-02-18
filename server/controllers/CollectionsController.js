const Collection = require('../models/collection')
const User = require('../models/user')

const Controller = {
  subtractPost: (req, res) => {
    const findUpdated = collection => {
      if (!collection) {
        throw new Error('Failed to add post into Collection.')
      } else {
        return Collection.findByAuthor(collection.author)
      }
    }

    const respond = collections => {
      res.json({ success: true, collections })
    }

    const onError = error => {
      res.json({ message: error.message })
    }

    Collection.findOneSubtractPost(req.body.collection, req.body.post)
      .then(findUpdated)
      .then(respond)
      .catch(onError)
  },

  addPost: (req, res) => {
    const findUpdated = collection => {
      if (!collection) {
        throw new Error('Failed to add post into Collection.')
      } else {
        return Collection.findByAuthor(collection.author)
      }
    }

    const respond = collections => {
      res.json({ success: true, collections })
    }

    const onError = error => {
      res.json({ message: error.message })
    }

    Collection.findOneAddPost(req.body.collection, req.body.post)
      .then(findUpdated)
      .then(respond)
      .catch(onError)
  },

  getByAuthor: (req, res) => {
    const author = req.query[0]

    const respond = collections => {
      res.json({ success: true, collections })
    }

    const onError = error => {
      res.json({ message: error.message })
    }

    Collection.findByAuthor(author)
      .then(respond)
      .catch(onError)
  },

  createCollection: (req, res) => {
    const { title, user } = req.body

    const createOnUser = collection => {
      if (!collection) {
        throw new Error('Failed to create collection.')
      } else {
        return User.createCollection(collection)
      }
    }

    const getUpdatedUser = user => {
      if (!user) throw new Error('Faild to create Collection on User')
      else {
        return User.findOneById(user._id)
      }
    }

    const respond = user => {
      res.json({
        success: true,
        user
      })
    }

    const onError = error => {
      res.json({ message: error.message })
    }

    Collection.create(title, user._id)
      .then(createOnUser)
      .then(getUpdatedUser)
      .then(respond)
      .catch(onError)
  }
}

module.exports = Controller
