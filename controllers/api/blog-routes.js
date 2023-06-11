const router = require('express').Router()
const { User, BlogPost, Comment } = require('../../models')
const withAuth = require('../../utils/auth')
const helpers = require('../../utils/helpers')
const chalk = require('chalk')
// Get all blog posts and the comments for each post

// Get a single blog post

// Create a new blog post
// show the UI for creating a new blog post
router.get('/new', withAuth, (req, res) => {
  console.log(chalk.yellow('new post'))
  res.render('new-post', {
    loggedIn: true
  })
})

// save a new blog post from a post request
router.post('/', withAuth, async (req, res) => {
  try {
    const newBlogPost = await BlogPost.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id
    })
    // get all blog posts and their comments for the user
    const blogPosts = await helpers.allBlogPosts(req.session.user_id)
    res.status(200).json(newBlogPost).render('dashboard', {
      blogPosts,
      loggedIn: true
    })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

// Update a blog post

// Delete a blog post

// Create a new comment

// Update a comment

// Delete a comment

module.exports = router
