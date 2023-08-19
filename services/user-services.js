const bcrypt = require('bcryptjs')
const { User } = require('../models')

const userServices = {
  signUp: (req, cb) => {
    if (req.body.password !== req.body.passwordCheck) throw new Error('Passwords do not match!')

    User.findOne({ where: { email: req.body.email } })
      .then(user => {
        if (user) throw new Error('Email already exists!')
        return bcrypt.hash(req.body.password, 10)
      })
      .then(hash => User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash,
        image: 'https://media.istockphoto.com/id/1344552674/vector/account-icon-profile-icon-vector-illustration.jpg?s=1024x1024&w=is&k=20&c=i_5sF8AFgX_ebEJgr05XbzHaofrB0-ujcmVM2XOHJSA='
      }))
      .catch(err => cb(err))
  }
}

module.exports = userServices
