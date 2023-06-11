const signupFormHandler = async (event) => {
  event.preventDefault()

  const username = document.querySelector('#username').value.trim()
  const password = document.querySelector('#password').value.trim()

  if (username && password) {
    if (password.length < 12 || password.length > 64) {
      alert('Password must be between 12 and 64 characters long.')
      return
    }
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' }
    })

    if (response.ok) {
      // if successful, redirect to the homepage
      document.location.replace('/')
    } else {
      alert('Failed to sign up.')
    }
  }
}

document.querySelector('#signup-form').addEventListener('submit', signupFormHandler)
