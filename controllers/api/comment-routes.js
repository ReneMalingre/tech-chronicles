const router = require('express').Router()
const { User, BlogPost, Comment } = require('../../models')
const withAuth = require('../../utils/auth')
const helpers = require('../../utils/helpers')
const chalk = require('chalk')

// return the new comment page for the blog post
router.get('/new', withAuth, async (req, res) => {
  // get the blog post from the database

  // get the parameters
  console.log(chalk.redBright(req.query))
  const blogPostId = req.query.blog_id
  const userId = req.query.user_id
  let blogPost = null
  if (blogPostId) {
    try {
      blogPost = await BlogPost.findOne({
        where: {
          id: blogPostId
        }
      })
      blogPost = blogPost.get({ plain: true })
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  }
  // render the new comment page
  res.render('new-comment', {
    loggedIn: true,
    blogPostId,
    userId,
    blogPost
  })
})

// save a new comment from a post request
router.post('/', withAuth, async (req, res) => {
  console.log(chalk.yellow('new comment'))
  try {
    console.log(chalk.greenBright(JSON.stringify(req.body)))

    const newComment = await Comment.create({
      content: req.body.content,
      blogpost_id: req.body.blogPostId,
      user_id: req.body.userId
    })

    // get all blog posts and their comments for the user
    const blogPosts = await helpers.allBlogPostsWithAddons(null, req.session)
    res.status(200).json(newComment).render('homepage', {
      blogPosts,
      loggedIn: req.session.loggedIn,
      pageTitle: '- Home',
      hasPosts: blogPosts.length > 0,
      username: req.session.username
    })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}
)

module.exports = router
