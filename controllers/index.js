const router = require('express').Router()

const homeRoutes = require('./home-routes.js')
const dashboardRoutes = require('./dashboard-routes.js')
const apiRoutes = require('./api')

router.use('/', homeRoutes)
router.use('/dashboard', dashboardRoutes)
router.use('/api', apiRoutes)

// add default 404 route for completeness
router.use((req, res) => {
  res.status(404).render('error-404', {})
})

module.exports = router
