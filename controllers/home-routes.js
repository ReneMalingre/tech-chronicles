const router = require('express').Router()
const { User, BlogPost, Comment } = require('../models')
const withAuth = require('../utils/auth')
const helpers = require('../utils/helpers')

// Display the homepage
router.get('/', async (req, res) => {
  try {
    // get all blog posts and their comments
    const blogPosts = await helpers.allBlogPosts()

    // pass the posts into the homepage template
    res.render('homepage', {
      blogPosts,
      // send the session variable (loggedIn) to the template
      loggedIn: req.session.loggedIn,
      pageTitle: '- Home',
      hasPosts: blogPosts.length > 0
    })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

// Display the login page
router.get('/login', (req, res) => {
  // if the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/')
    return
  }
  // otherwise, render the login template
  res.render('login', {
    // send the page title to the template
    pageTitle: '- Login'
  })
})

// Display the signup page
router.get('/signup', (req, res) => {
  // if the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/')
    return
  }
  // otherwise, render the signup template
  res.render('signup', {
    // send the page title to the template
    pageTitle: '- Sign Up'
  })
})


// Show the dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // get all blog posts and their comments
    const blogPosts = await helpers.allBlogPosts()

    // pass the posts into the homepage template
    res.render('dashboard', {
      blogPosts,
      // send the session variable (loggedIn) to the template
      loggedIn: req.session.loggedIn,
      pageTitle: '- Dashboard'
    })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

module.exports = router
