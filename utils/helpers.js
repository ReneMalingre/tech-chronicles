// Utility Functions
const { User, BlogPost, Comment } = require('../models')
const Handlebars = require('handlebars')

// get all blog posts and their comments and user info
async function allBlogPosts (userID = null, blogPostID = null) {
  // if a user ID is passed in, get only the posts for that user
  // if a blog post ID is passed in, get only that post
  const blogPostWhere = {}
  if (userID) {
    blogPostWhere.user_id = userID
  }
  if (blogPostID) {
    blogPostWhere.id = blogPostID
  }

  try {
    const blogPostData = await BlogPost.findAll({
      attributes: [
        'id',
        'title',
        'content',
        'user_id',
        'created_at',
        'updated_at'
      ],
      where: blogPostWhere,
      // order the posts from newest to oldest
      order: [
        ['created_at', 'DESC']
      ],
      // and the comments associated with them
      include: [{
        model: Comment,
        attributes: [
          'id',
          'content',
          'blogpost_id',
          ['user_id', 'commenter_id'],
          'created_at'
        ],
        order: [
          ['created_at', 'ASC']
        ],
        // and the user who made the comment
        include: {
          model: User,
          attributes: ['username']
        }
      },
      // and the user who made the post
      {
        model: User,
        attributes: ['username']
      }
      ]
    })

    // turn the posts into plain JS objects
    const blogPosts = blogPostData.map(post => post.get({ plain: true }))
    return blogPosts
  } catch (err) {
    console.log(err)
    return err
  }
}

function addCurrentUserToEveryObject (arrayOfObjects, currentUserID) {
  // if the user is logged in, add a property to each object in the array
  // to indicate whether the current user is the author of the object
  arrayOfObjects.forEach(object => {
    object.isCurrentUser = object.user_id === currentUserID
    object.currentUserID = currentUserID
  })
  return arrayOfObjects
}

function addLoggedInToEveryObject (arrayOfObjects, loggedIn) {
  // add a property to each object in the array
  // to indicate whether the user is logged in
  arrayOfObjects.forEach(object => {
    object.loggedIn = loggedIn
  })
  return arrayOfObjects
}

// get the blog posts and add the current user and logged in status to each object
async function allBlogPostsWithAddons (userID = null, blogPostID = null, session) {
  let blogPosts = await allBlogPosts(userID, blogPostID)
  blogPosts = addCurrentUserToEveryObject(blogPosts, session.user_id)
  blogPosts = addLoggedInToEveryObject(blogPosts, session.loggedIn)
  return blogPosts
}

// Handlebars custom helper to compare two values. Fancy! Lots of googling...
function compareValues (value1, value2, options) {
  // compare dates
  if (value1 instanceof Date && value2 instanceof Date) {
    // Get the time difference in milliseconds (some databases have unique timestamp precision)
    const diff = Math.abs(value1.getTime() - value2.getTime())
    if (diff < 1000) {
      return options.fn(this) // values are the same, execute the content inside the block
    } else {
      return options.inverse(this) // values are different, execute the content inside the else block
    }
  } else {
    // compare other things
    if (value1 === value2) {
      return options.fn(this) // values are the same, execute the content inside the block
    } else {
      return options.inverse(this) // values are different, execute the content inside the else block
    }
  }
}
// register the helper with Handlebars
Handlebars.registerHelper('compareValues', compareValues)

// function to get the date in a format that can be displayed in the UI
function formatBlogDate (date) {
  // test if it is a valid date
  if (isNaN(Date.parse(date))) {
    return date
  }
  const dateObj = new Date(date)
  const month = dateObj.getMonth() + 1 // months are zero indexed. How stupid!
  const day = dateObj.getDate()
  const year = dateObj.getFullYear()
  let hour = dateObj.getHours()
  let amOrPm = 'am'
  if (hour > 12) {
    hour = hour - 12
    amOrPm = 'pm'
  }
  let minute = dateObj.getMinutes()
  // ensure minute has two digits
  if (minute < 10) {
    minute = '0' + minute
  }
  return `${year}-${month}-${day} ${hour}:${minute} ${amOrPm}`
}

module.exports = { allBlogPosts, compareValues, formatBlogDate, addCurrentUserToEveryObject, addLoggedInToEveryObject, allBlogPostsWithAddons }
