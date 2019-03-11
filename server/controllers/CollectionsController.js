const Collection = require('../models/collection')
const User = require('../models/user')

const Controller = {
  delete: (req, res) => {
    const { collection } = req.body

    const subtractOnUser = collection => {
      if (!collection) {
        throw new Error('delete Error')
      } else {
        return User.deleteCollection(collection)
      }
    }

    const respond = collection => {
      res.json({ success: true, collection })
    }

    const onError = error => {
      res.json({ message: error.message })
    }

    Collection.deleteOne(collection)
      .then(subtractOnUser)
      .then(respond)
      .catch(onError)
  },

  update: (req, res) => {
    const { collection } = req.body

    const respond = collection => {
      res.json({ success: true, collection })
    }

    const onError = error => {
      res.json({ message: error.message })
    }

    Collection.updateOne(collection)
      .then(respond)
      .catch(onError)
  },

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

    const find = author => {
      if (author) return Collection.findByAuthor(author)
      else return Collection.findAll()
    }

    const respond = collections => {
      res.json({ success: true, collections })
    }

    const onError = error => {
      res.json({ message: error.message })
    }

    find(author)
      .then(respond)
      .catch(onError)
  },

  getByIds: (req, res) => {
    const { mode } = req.query
    let { ids } = req.params
    ids = ids.split(',')

    const find = mode => {
      if (mode === 'id') return Collection.findByIds(ids)
      else if (mode === 'word') return Collection.findByWords(ids)
    }

    const respond = collections => {
      res.json({ success: true, collections })
    }

    const onError = error => {
      res.json({ message: error.message })
    }
    find(mode)
      // Collection.findByIds(ids)
      .then(respond)
      .catch(onError)
  },

  createCollection: (req, res) => {
    const { title, author } = req.body

    const createOnUser = collection => {
      if (!collection) {
        throw new Error('Failed to create collection.')
      } else {
        return User.createCollection(collection)
      }
    }

    const getUpdatedUser = user => {
      if (!user) throw new Error('Failed to create Collection on User')
      else {
        return User.findById(user._id)
      }
    }

    const respond = user => {
      if (user.length === 1) user = user[0]
      res.json({
        success: true,
        user
      })
    }

    const onError = error => {
      res.json({ message: error.message })
    }

    Collection.create(title, author)
      .then(createOnUser)
      .then(getUpdatedUser)
      .then(respond)
      .catch(onError)
  }
}

module.exports = Controller
