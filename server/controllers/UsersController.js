const User = require('../models/user')

module.exports = {
  update: (req, res) => {
    const { id } = req.params
    const user = req.body

    const respond = () => {
      res.json({ success: true })
    }

    const onError = error => {
      res.json({
        message: error.message
      })
    }

    User.update(id, user)
      .then(respond)
      .catch(onError)
  },

  signup: (req, res) => {
    const newUser = {
      email: req.body.email,
      password: req.body.password,
      name: req.body.name
    }

    const create = user => {
      if (user) {
        throw new Error('Email exists')
      } else {
        return User.create(newUser)
      }
    }

    const respond = () => {
      res.json({
        success: true,
        message: 'Signed up successfully'
      })
    }

    const onError = error => {
      res.json({
        message: error.message
      })
    }

    User.findOneByEmail(newUser.email)
      .then(create)
      .then(respond)
      .catch(onError)
  },

  getUser: (req, res) => {
    const { mode } = req.query

    const find = mode => {
      let { id } = req.params
      id = id.split(',')
      if (mode === 'id') return User.findById(id)
      else if (mode === 'word') return User.findByWord(id)
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
    find(mode)
      .then(respond)
      .catch(onError)
  },

  getAllUsers: (req, res) => {
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

    User.findAll()
      .then(respond)
      .catch(onError)
  },

  getUserProfileImage: (req, res) => {
    const { id } = req.params

    const respond = image => {
      res.json({
        success: true,
        image: image.image
      })
    }

    const onError = error => {
      res.json({ message: error.message })
    }

    User.findOneProfileImageById(id)
      .then(respond)
      .catch(onError)
  }
}