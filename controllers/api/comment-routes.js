// Purpose: to handle the comment routes
const router = require('express').Router()
const { Comment } = require('../../models')
const withAuth = require('../../utils/auth')
const helpers = require('../../utils/helpers')

// return the new comment UI page for the blog post
router.get('/new', withAuth, async (req, res) => {
  // get the blog post from the database
  // get the parameters
  const blogPostId = req.query.blog_id
  const userId = req.session.user_id
  let blogPost = null
  if (blogPostId) {
    try {
      blogPost = await helpers.allBlogPostsWithAddons(null, blogPostId, req.session)
    } catch (err) {
      console.log(err)
      res.status(500).json({ err, message: 'Error getting blog post' })
    }
  } else {
    res.status(500).json({ message: 'No blog post id provided' })
  }
  // show the UI to create the new comment
  res.render('new-comment', {
    loggedIn: true,
    blogPostId,
    userId,
    hasPosts: blogPost.length > 0,
    blogPost,
    username: req.session.username
  })
})

// save a new comment from a post request
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      content: req.body.content,
      blogpost_id: req.body.blogPostId,
      user_id: req.session.user_id
    })
    res.status(200).json(newComment)
  } catch (err) {
    console.log(err)
    res.status(500).json({ err, message: 'Error creating comment' })
  }
}
)

module.exports = router
