async function newCommentHandler (event) {
  event.preventDefault()

  const content = document.querySelector('#comment').value.trim()
  // get the data-blog-id attribute and data-user-id attribute from the button
  const blogPostId = document.querySelector('#submit-button').getAttribute('data-blog-id')
  const userId = document.querySelector('#submit-button').getAttribute('data-user-id')
  console.log(`blogPostId: ${blogPostId}, userId: ${userId}`)
  console.log(`content: ${content}`)

  if (content && blogPostId && userId) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        blogPostId,
        userId,
        content
      })
    })
    const data = await response.json()
    if (response.ok) {
      document.location.replace('/dashboard')
    } else {
      // eslint-disable-next-line no-undef
      alertModal('Error creating new blog', data.statusText)
      console.log('error: ' + data.statusText)
    }
  } else {
    // eslint-disable-next-line no-undef
    alertModal('Error creating new blog', 'Please enter a title and content for your blog post.')
  }
}

// event handler
document.querySelector('#new-comment-form').addEventListener('submit', newCommentHandler)
