// This file is used to handle the blog post routes
const router = require('express').Router()
const { BlogPost } = require('../../models')
const withAuth = require('../../utils/auth')
const helpers = require('../../utils/helpers')

// Create a new blog post
// show the UI for creating a new blog post
router.get('/new', withAuth, (req, res) => {
  res.render('new-post', {
    loggedIn: true,
    pageTitle: '- Dashboard',
    username: req.session.username,
    isDashboard: true
  })
})

// show the UI for editing a blog post
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const blogID = req.params.id
    if (!blogID) {
      res.status(400).json({ message: 'No blog post with that ID' })
      return
    }
    const blogPosts = await helpers.allBlogPostsWithAddons(null, blogID, req.session)
    res.status(200).render('edit-post', {
      blogPosts,
      loggedIn: req.session.loggedIn,
      pageTitle: '- Dashboard',
      username: req.session.username,
      isDashboard: true
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ err, message: 'Error getting blog post' })
  }
})

// save a new blog post from a post request
router.post('/', withAuth, async (req, res) => {
  try {
    const blogData = await BlogPost.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id
    })
    if (!blogData) {
      res.status(500).json({ message: 'Could not create a new blog post' })
      return
    }
    res.status(200).json(blogData)
  } catch (err) {
    console.log(err)
    res.status(500).json({ err, message: 'Error creating blog post' })
  }
})

// Update a blog post
// save a new blog post from a post request
router.put('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await BlogPost.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    if (!blogData[0]) {
      res.status(404).json({ message: 'No blog post with this id!' })
      return
    }
    res.status(200).json(blogData)
  } catch (err) {
    console.log(err)
    res.status(500).json({ err, message: 'Error updating blog post' })
  }
})

// Delete a blog post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await BlogPost.destroy({
      where: {
        id: req.params.id
      }
    })
    if (!blogData) {
      res.status(404).json({ message: 'No blog post with this id!' })
      return
    }
    res.status(200).json(blogData)
  } catch (err) {
    console.log(err)
    res.status(500).json({ err, message: 'Error deleting blog post' })
  }
})

module.exports = router
