const chalk = require('chalk')
// Utility function to check if the user is logged in
// If the user is not logged in, redirect the user to the login page

const withAuth = (req, res, next) => {
  console.log(chalk.yellow('checking for authentication'))
  if (!req.session.loggedIn) {
    console.log(chalk.yellow('authentication failed'))
    res.redirect('/login')
  } else {
    console.log(chalk.yellow('authentication succeeded'))
    next()
  }
}

module.exports = withAuth
