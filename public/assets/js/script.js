// Contains the main script for the application

// ! Show alert modal
// eslint-disable-next-line no-unused-vars
function alertModal (title, message) {
  // Populate modal title and body
  document.getElementById('feedbackModalLabel').textContent = title
  document.getElementById('feedbackModalBody').textContent = message

  // Show modal
  const options = { backdrop: 'static', keyboard: true }
  // eslint-disable-next-line no-undef
  const feedbackModal = new bootstrap.Modal(document.getElementById('feedbackModal'), options)
  feedbackModal.show()
}

// get all navbar links
const navLinks = document.querySelectorAll('.nav-link')
// add eventlistener to each link
navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault()
    // get the id of the link
    const id = link.getAttribute('id')
    switch (id) {
      case 'home-link':
        window.location.replace('/')
        break
      case 'dashboard-link':
        window.location.replace('/dashboard')
        break
      case 'logout-link':
        window.location.replace('/logout')
        break
      case 'login-link':
        window.location.replace('/login')
        break
      case 'signup-link':
        window.location.replace('/signup')
        break
      case 'new-post-link':
        window.location.replace('/api/blogs/new')
        break
      default:
    }
  })
})

// detect click on blog post
const blogPosts = document.querySelectorAll('.blog-card')
blogPosts.forEach((blogPost) => {
  blogPost.addEventListener('click', (event) => {
    event.preventDefault()
    // get the id of the blog
    const blogId = blogPost.getAttribute('data-blog-id')
    if (!blogId) {
      return
    }
    // create new comment
    window.location.replace(`/api/comments/new?blog_id=${blogId}`)
  })
})

// detect click on dashboard blog post
const dashboardBlogPosts = document.querySelectorAll('.dashboard-blog-card')
dashboardBlogPosts.forEach((dashboardBlogPost) => {
  dashboardBlogPost.addEventListener('click', async (event) => {
    event.preventDefault()
    // get the id of the blog
    const blogId = dashboardBlogPost.getAttribute('data-blog-id')
    if (!blogId) {
      return
    }
    // edit blog using fetch
    try {
      window.location.replace(`/api/blogs/edit/${blogId}`)
    } catch (error) {
      // eslint-disable-next-line no-undef
      alertModal('Error editing blog', error.message)
      window.location.replace('/dashboard')
    }
  })
})

// action new post
try {
  document.getElementById('new-post-button').addEventListener('click', (event) => {
    event.preventDefault()
    window.location.replace('/api/blogs/new')
  })
} catch (error) {
  // ignore error as this element may not exist
}
