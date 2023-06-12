const router = require('express').Router()
const { User } = require('../../models')
const chalk = require('chalk')

// CREATE new user
router.post('/', async (req, res) => {
// check that the user does not already exist
  try {
    const dbUserData = await User.findOne({
      where: {
        username: req.body.username
      }
    })
    if (dbUserData) {
      // already exists. Let the user know
      res
        .status(400)
        .json({ message: 'This username is already taken.' })
      return
    }
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      password: req.body.password
    })

    req.session.save(() => {
      req.session.loggedIn = true
      req.session.user_id = dbUserData.id
      req.session.username = dbUserData.username
      res.status(200).json(dbUserData)
    })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

// Login
router.post('/login', async (req, res) => {
  console.log(chalk.yellow('login route'))
  try {
    const userData = await User.findOne({
      where: {
        username: req.body.username
      }
    })
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password. Please try again!' })
      return
    }
    const validPassword = await userData.checkPassword(req.body.password)
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password. Please try again!' })
      return
    }
    req.session.save(() => {
      req.session.loggedIn = true
      req.session.user_id = userData.id
      req.session.username = userData.username
      res
        .status(200)
        .json({ user: userData, message: 'You are now logged in!' })
    })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

module.exports = router
