var express = require('express')
var router = express.Router()
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

// Middleware to verify JWT token and check user role
const secretKey = process.env.JWT_SECRET
function authenticateAdmin(req, res, next) {
  // Get the JWT token from the query parameters
  const token =
    req.cookies.token ||
    req.query.token ||
    req.headers['x-access-token'] ||
    req.body.token

  if (!token) {
    return res
      .status(401)
      .redirect('/shiv?message=Unauthorized: No token provided')
  }

  // Verify the JWT token
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.error('JWT verification error:', err.message)
      return res.status(500).json({ error: 'Internal Server Error' })
    }
    // Check if user is an admin
    if (decoded.role !== 'admin') {
      return res
        .status(403)
        .redirect(
          '/shiv?message=Forbidden: You do not have permission to access the dashboard',
        )
    }
    // User is authenticated and authorized
    req.user = decoded
    next()
  })
}

/* GET admin dashboard. */
router.get('/shiv/dashboard', authenticateAdmin, function (req, res, next) {
  res.render('admin')
})

/* GET login page. */
router.get('/shiv', function (req, res, next) {
  res.render('login')
})

/* GET admin logout  */
router.get('/shiv/logout', function (req, res, next) {
  res.redirect('/shiv')
})

/* GET admin blogs. */
router.get('/shiv/blogs', authenticateAdmin, function (req, res, next) {
  res.render('blogs')
})

/* GET admin messages. */
router.get('/shiv/messages', authenticateAdmin, function (req, res, next) {
  res.render('messages')
})

/* GET admin subs. */
router.get('/shiv/subs', authenticateAdmin, function (req, res, next) {
  res.render('subs')
})

/* GET admin addblog. */
router.get('/shiv/addBlog', authenticateAdmin, function (req, res, next) {
  res.render('NewBlog')
})

/* GET admin setting. */
router.get('/shiv/setting', authenticateAdmin, function (req, res, next) {
  res.render('setting')
})

module.exports = router
