const mongoose = require('mongoose')

const HistorySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  conversations: [
    {
      withUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      withGroup: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
      lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
      timestamp: { type: Date, default: Date.now },
    },
  ],
})

module.exports = mongoose.model('History', HistorySchema, 'History')
