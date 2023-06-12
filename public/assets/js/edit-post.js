// Validates the edit post form and sends the request to the server
async function editBlogPostHandler (event) {
  event.preventDefault()

  const title = document.querySelector('#title').value.trim()
  const content = document.querySelector('#content').value.trim()
  const id = document.getElementById('edit-blog-post-form').getAttribute('data-blog-id')
  if (title && content) {
    const response = await fetch(`/api/blogs/${id}`, {
      method: 'PUT',
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
      alertModal('Error editing blog', data.message)
    }
  } else {
    // eslint-disable-next-line no-undef
    alertModal('Error editing blog', 'Please enter a title and content for your blog post.')
  }
}

// event handler for the form
document.querySelector('#edit-blog-post-form').addEventListener('submit', editBlogPostHandler)

// event handler for the cancel button
document.getElementById('cancel-button').addEventListener('click', (event) => {
  event.preventDefault()
  window.location.replace('/dashboard')
}
)

// event handler for the delete button
document.getElementById('delete-button').addEventListener('click', async (event) => {
  event.preventDefault()
  // get confirmation from the user
  const blogId = document.getElementById('edit-blog-post-form').getAttribute('data-blog-id')
  if (!blogId) {
    return
  }

  // Populate confirmation modal title and body
  document.getElementById('confirmationModalLabel').textContent = 'Confirm Delete'
  document.getElementById('confirmationModalBody').textContent = 'Are you sure you want to delete this blog post?'

  // Show modal
  const options = { backdrop: 'static', keyboard: true }
  // eslint-disable-next-line no-undef
  const deleteModal = new bootstrap.Modal(document.getElementById('confirmationModal'), options)
  deleteModal.show()

  // add eventlistener to delete button
  document.getElementById('confirm-yes').addEventListener('click', async () => {
    // send delete request
    const response = await fetch(`/api/blogs/${blogId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    if (response.ok) {
      window.location.replace('/dashboard')
    } else {
      // eslint-disable-next-line no-undef
      alertModal('Error deleting blog', data.message)
    }
  }
  )
})

// detect when the page is loaded
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
