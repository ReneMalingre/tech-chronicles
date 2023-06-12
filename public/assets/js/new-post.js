// Initiated by: new-post.handlebars
// validates and creates a new blog post
async function newBlogPostHandler (event) {
  event.preventDefault()
  // avoid double click
  document.getElementById('save-post-button').disabled = true

  const title = document.querySelector('#title').value.trim()
  const content = document.querySelector('#content').value.trim()

  if (title && content) {
    const response = await fetch('/api/blogs', {
      method: 'POST',
      body: JSON.stringify({
        title,
        content
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    if (response.ok) {
      document.location.replace('/dashboard')
    } else {
      // eslint-disable-next-line no-undef
      alertModal('Error creating new blog', data.message)
    }
  } else {
    // eslint-disable-next-line no-undef
    alertModal('Error creating new blog', 'Please enter a title and content for your blog post.')
  }
}

// event handler
document.querySelector('#new-blog-post-form').addEventListener('submit', newBlogPostHandler)

document.getElementById('cancel-button').addEventListener('click', (event) => {
  event.preventDefault()
  window.location.replace('/dashboard')
}
)

// detect when the page is loaded and hide the new post button and menu link
document.addEventListener('DOMContentLoaded', () => {
  // disable the new post button and menu link
  try {
    document.getElementById('new-post-button').style.display = 'none'
    document.getElementById('new-post-link').style.display = 'none'
  } catch (err) {
    // ignore
  }
}
)
