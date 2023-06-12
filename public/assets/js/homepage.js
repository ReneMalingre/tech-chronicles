// Action Comment on Blog Post, Create new Blog

// if one of the Comments is clicked, then the user is taken to the Comment page
function handleCommentClick (event) {
  event.preventDefault()
  console.log('handleCommentClick')
  const blogPostID = event.target.getAttribute('data-blog-id')
  const userID = event.target.getAttribute('data-user-id')
  window.location.replace(`/api/comments/new?blog_id=${blogPostID}&user_id=${userID}`)
}

function handleEditClick (event) {
  event.preventDefault()
  console.log('handleEditClick')
  const blogPostID = event.target.getAttribute('data-blog-id')
  window.location.replace(`/api/blogs/${blogPostID}`)
}

function handleDeleteClick (event) {
  event.preventDefault()
  console.log('handleDeleteClick')
  const blogPostID = event.target.getAttribute('data-blog-id')
  window.location.replace(`/api/blogs/${blogPostID}`)
}

function handleNewBlogClick (event) {
  event.preventDefault()
  console.log('handleNewBlogClick')
  window.location.replace('/api/blogs/new')
}

const commentLinks = document.querySelectorAll('.blog-comment-link')
// detect if any of the comment links are clicked
commentLinks.forEach(commentLink => {
  commentLink.addEventListener('click', handleCommentClick)
}
)
const editLinks = document.querySelectorAll('.blog-edit-link')
// detect if any of the edit links are clicked
editLinks.forEach(editLink => {
  editLink.addEventListener('click', handleEditClick)
}
)
const deleteLinks = document.querySelectorAll('.blog-delete-link')
// detect if any of the delete links are clicked
deleteLinks.forEach(deleteLink => {
  deleteLink.addEventListener('click', handleDeleteClick)
}
)
// const newBlogLink = document.querySelector('#new-blog-link')
// // detect if the new blog link is clicked
// newBlogLink.addEventListener('click', handleNewBlogClick)
