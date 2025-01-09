var express = require('express')
var router = express.Router()

var {
  createMessage,
  getAllMessages,
  getMessageById,
  updateMessage,
} = require('../controller/messages')

// route to create a message
router.post('/messages', createMessage)

module.exports = router
