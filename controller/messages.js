// Import the database connection module
const { getCollection } = require('../db.js')

// message controllers
module.exports = {
  // Create a new message
  async createMessage(req, res) {
    try {
      const { sender, email, subject, content } = req.body
      const dataToBeInserted = {
        sender: sender,
        email: email,
        subject: subject,
        content: content,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      const messagesCollection = getCollection('messages')
      const result = await messagesCollection.insertOne( dataToBeInserted )
      if (!result) {
        return res.status(400).json({ error: 'Message not created' })
      } else {
        res.status(201).json({
          message: 'Message created successfully',
          data: result,
        })
      }
    } catch (error) {
      console.error('Error creating message:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  },

  // Get all messages
  async getAllMessages(req, res) {
    try {
      const messagesCollection = getCollection('messages')
      const messages = await messagesCollection.find().toArray()
      res.status(200).json({ data: messages })
    } catch (error) {
      console.error('Error fetching messages:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  },

  // Get a single message by ID
  async getMessageById(req, res) {
    try {
      const { id } = req.params
      const messagesCollection = getCollection('messages')
      const message = await messagesCollection.findOne({ _id: id })
      if (!message) {
        return res.status(404).json({ error: 'Message not found' })
      }
      res.status(200).json({ data: message })
    } catch (error) {
      console.error('Error fetching message:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  },


  // Delete a message by ID
  async deleteMessage(req, res) {
    try {
      const { id } = req.params

      const messagesCollection = getCollection('messages')
      const result = await messagesCollection.findOneAndDelete({ _id: id })

      if (!result.value) {
        return res.status(404).json({ error: 'Message not found' })
      }

      res.status(200).json({ message: 'Message deleted successfully' })
    } catch (error) {
      console.error('Error deleting message:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  },
}
