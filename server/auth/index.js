const router = require('express').Router()
const User = require('../db/models/User')
const CartItem = require('../db/models/CartItem')
const Cart = require('../db/models/Cart')
module.exports = router

// async function asyncForEach(array, callback) {
//   for (let index = 0; index < array.length; index++) {
//     await callback(array[index], index, array)
//   }
// }

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}})
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      // // get the unauth'ed users cartId
      // const currentGuest = await User.findOne({
      //   where: {
      //     email: req.sessionID
      //   },
      //   attributes: ['cartId']
      // })
      // // set the logged in user's cartId to the unauth cartId
      // const updatedVals = {
      //   isAuth: true,
      //   cartId: currentGuest.cartId
      // }
      // // if user already had a cart
      // if (user.cartId) {
      //   // get items from cart
      //   const existingCartItems = await CartItem.findAll({
      //     where: {
      //       cartId: user.cartId
      //     }
      //   })
      //   //map through existingCartItems and update the cartId to currentGuest.cartId
      //   const updateItems = async () => {
      //     await asyncForEach(existingCartItems, async cartItem => {
      //       await CartItem.update(
      //         {
      //           cartId: currentGuest.cartId
      //         },
      //         {
      //           where: {
      //             cartId: user.cartId
      //           },
      //           returning: true
      //         }
      //       )
      //     })
      //   }
      //   updateItems()
      // }
      // const loggedInUser = await User.update(updatedVals, {
      //   where: {
      //     id: user.id
      //   },
      //   returning: true
      // })
      // const removeUnauthUser = await User.destroy({
      //   where: {
      //     email: req.sessionID
      //   }
      // })
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const newCart = await Cart.create() //and give them a cart
    const user = await User.create({
      email: req.body.email,
      password: req.body.password,
      cartId: newCart.id,
      isAuth: true
    })

    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
