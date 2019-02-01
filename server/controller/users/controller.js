const User = require('../../models/user')

exports.signup = (req, res) => {
  console.log('/signup', req.body)
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
    res.status(409).json({
      message: error.message
    })
  }

  User.findOneByEmail(newUser.email)
    .then(create)
    .then(respond)
    .catch(onError)
}
