const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { getCollection } = require('../db')

// Secret key for JWT token
const secretKey = process.env.JWT_SECRET

const adminController = {
  // Admin login
  async login(req, res) {
    try {
      const { email, password } = req.body

      // Retrieve admin document from database by email
      const adminsCollection = getCollection('admins')
      const admin = await adminsCollection.findOne({ email })

      // Check if admin exists and password matches
      if (!admin || !bcrypt.compareSync(password, admin.password)) {
        return res.status(401).json({ error: 'Invalid credentials' })
      }

      // Create JWT token
      const token = jwt.sign(
        { id: admin._id, email: admin.email, role: admin.role },
        secretKey,
        {
          expiresIn: '1h',
        },
      )
      // store token in cookies
      res.cookie('token', token, { httpOnly: true })
      // Send the token as a JSON response
      res.status(200).json({ token })
    } catch (error) {
      console.error('Error logging in:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  },

  // Admin signup
  async signup(req, res) {
    try {
      const { email, password } = req.body

      // Check if admin with the same email already exists
      const adminsCollection = getCollection('admins')
      const existingAdmin = await adminsCollection.findOne({ email })
      if (existingAdmin) {
        return res
          .status(400)
          .json({ error: 'Admin already exists with this email' })
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10)

      // Insert the new admin record into the database
      await adminsCollection.insertOne({
        email,
        role: 'admin',
        privelege: 'all',

        password: hashedPassword,
        createdAt: new Date(),
      })

      res.status(201).json({ message: 'Admin created successfully' })
    } catch (error) {
      console.error('Error signing up:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  },

  // admin logout
async logout(req, res) {
  try {
    // get the token in the query parameter or in the session
    const token = req.query.token || req.session.token;
    // make the expire time to now so that the token is invalid and then redirect to the login page
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
      }
      // Clear session
      req.session.destroy((err) => {
        if (err) {
          console.error('Error destroying session:', err);
        }
        // Clear cookie
        res.clearCookie('token');
        res.redirect('/shiv');
      });
    });
  } catch (error) {
    console.error('Error logging out:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}




}

module.exports = adminController
