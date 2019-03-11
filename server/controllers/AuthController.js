const User = require('../models/user')
const jwt = require('jsonwebtoken')

exports.login = (req, res) => {
  const { email, password } = req.body
  const secret = req.app.get('jwt-secret')

  const check = user => {
    if (!user) {
      throw new Error('Email does not exist.')
    } else {
      if (user.verify(password)) {
        const promise = new Promise((resolve, reject) => {
          jwt.sign(
            {
              _id: user._id,
              email: user.email
            },
            secret,
            {
              expiresIn: 1000 * 60 * 60 * 24 * 7,
              issuer: 'stirring.com',
              subject: 'userInfo'
            },
            (err, token) => {
              if (err) {
                reject(err)
              }
              user.password = null
              resolve({ user, token })
            }
          )
        })
        return promise
      } else {
        throw new Error('The password is wrong.')
      }
    }
  }

  const respond = payload => {
    res.json({
      success: true,
      message: 'logged in successfully.',
      user: payload.user,
      token: payload.token
    })
  }

  const onError = error => {
    res.status(200).json({
      message: error.message
    })
  }

  User.findOneByEmail(email)
    .then(check)
    .then(respond)
    .catch(onError)
}

exports.refresh = (req, res) => {
  const { email } = req.decoded
  const secret = req.app.get('jwt-secret')

  const check = user => {
    if (!user) {
      throw new Error('Email does not exist.')
    } else {
      const promise = new Promise((resolve, reject) => {
        jwt.sign(
          {
            _id: user._id,
            email: user.email
          },
          secret,
          {
            expiresIn: '10m',
            issuer: 'stirring.com',
            subject: 'userInfo'
          },
          (err, token) => {
            if (err) {
              reject(err)
            }
            user.password = null
            resolve({ user, token })
          }
        )
      })
      return promise
    }
  }

  const respond = payload => {
    res.json({
      success: true,
      message: 'Refreshing token.',
      user: payload.user,
      token: payload.token
    })
  }

  const onError = error => {
    res.status(200).json({
      message: error.message
    })
  }

  User.findOneByEmail(email)
    .then(check)
    .then(respond)
    .catch(onError)
}

exports.check = (req, res) => {
  res.json({
    success: true,
    info: req.decoded
  })
}

// exports.me = (req, res) => {
//   const { email } = req.decoded

//   const respond = payload => {
//     payload.password = null
//     res.json({
//       success: true,
//       user: payload
//     })
//   }
//   const onError = error => {
//     res.status(409).json({
//       message: error.message
//     })
//   }

//   User.findOneByEmail(email)
//     .then(respond)
//     .catch(onError)
// }
