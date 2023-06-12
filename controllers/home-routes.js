// The home routes handle the homepage, login, logout, and signup pages
const router = require('express').Router()
const helpers = require('../utils/helpers')

// Display the homepage
router.get('/', async (req, res) => {
  try {
    // get all blog posts and their comments, add user info to each post
    const blogPosts = await helpers.allBlogPostsWithAddons(null, null, req.session)

    // pass the posts into the homepage template
    res.render('homepage', {
      blogPosts,
      // send the session variable (loggedIn) to the template
      loggedIn: req.session.loggedIn,
      pageTitle: '- Home',
      hasPosts: blogPosts.length > 0,
      username: req.session.username,
      isDashboard: false
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ err, message: 'Error getting blog posts' })
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

// Log the user out
router.get('/logout', (req, res) => {
  // if the user is logged in, destroy the session and redirect to the homepage
  if (req.session.loggedIn) {
    try {
      req.session.destroy(() => {
        res.redirect('/')
      })
    } catch (err) {
      console.log(err)
      res.status(500).json({ err, message: 'Error logging out' })
    }
  } else {
    // otherwise, redirect to the homepage
    res.redirect('/')
  }
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

module.exports = router
