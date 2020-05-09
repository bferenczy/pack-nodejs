const Schema = require('mongoose').Schema;
const db = require('../config/db', { useUnifiedTopology: true });

const Reply = db.model('Reply', {
    text: String,
    date: Date,
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    comment: {type: Schema.Types.ObjectId, ref: 'Comment'}
});

module.exports = Reply;
