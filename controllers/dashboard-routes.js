const router = require('express').Router()
const { User, BlogPost, Comment } = require('../models')
const withAuth = require('../utils/auth')

module.exports = router
