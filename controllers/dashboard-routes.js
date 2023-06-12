const router = require('express').Router()
const withAuth = require('../utils/auth')
const helpers = require('../utils/helpers')

// Show the dashboard
router.get('/', withAuth, async (req, res) => {
  try {
    // get all blog posts and their comments
    const userID = req.session.user_id
    // just need the simpler blog post data
    const blogPosts = await helpers.allBlogPosts(userID, null)

    // pass the posts into the homepage template
    res.render('dashboard', {
      blogPosts,
      loggedIn: req.session.loggedIn,
      pageTitle: '- Dashboard',
      hasPosts: blogPosts.length > 0,
      username: req.session.username,
      isDashboard: true
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ err, message: 'Error getting blog posts for dashboard' })
  }
})
module.exports = router
