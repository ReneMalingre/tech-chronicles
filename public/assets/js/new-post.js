async function newBlogPostHandler (event) {
  event.preventDefault()

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

    if (response.ok) {
      document.location.replace('/dashboard')
    } else {
      alert(response.statusText)
    }
  } else {
    alert('Please enter a title and content for your blog post.')
  }
}

// event handler
document.querySelector('#new-blog-post-form').addEventListener('submit', newBlogPostHandler)
