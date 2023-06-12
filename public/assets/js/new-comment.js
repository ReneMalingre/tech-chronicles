// Initiated by: new-comment.handlebars
async function newCommentHandler (event) {
  event.preventDefault()
  // avoid double click
  document.getElementById('submit-button').disabled = true

  const content = document.querySelector('#comment').value.trim()
  // get the data-blog-id attribute and data-user-id attribute from the button
  const blogPostId = document.querySelector('#submit-button').getAttribute('data-blog-id')

  if (content && blogPostId) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        blogPostId,
        content
      })
    })
    const data = await response.json()
    if (response.ok) {
      // api call successful - load homepage
      window.location.replace('/')
    } else {
      // eslint-disable-next-line no-undef
      alertModal('Error creating new comment', data.statusText)
      console.log('error: ' + data.statusText)
    }
  } else {
    // eslint-disable-next-line no-undef
    alertModal('Error creating new comment', 'Please enter content for your comment.')
  }
}

// event handler
document.querySelector('#new-comment-form').addEventListener('submit', newCommentHandler)

window.onload = function () {
  document.getElementById('new-comment-form').scrollIntoView()
}

document.getElementById('cancel-button').addEventListener('click', (event) => {
  event.preventDefault()
  window.location.replace('/')
})
