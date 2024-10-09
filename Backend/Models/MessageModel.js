const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
  recipients: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
})

module.exports = mongoose.model('Message', MessageSchema, 'Message')
