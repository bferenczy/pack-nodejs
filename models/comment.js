const Schema = require('mongoose').Schema;
const db = require('../config/db', { useUnifiedTopology: true });

const Comment = db.model('Comment', {
    post: {type: Schema.Types.ObjectId, ref: 'Post'},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    replies: [{type: Schema.Types.ObjectId, ref: 'Reply'}],
    date: Date,
    text: String
});

module.exports = Comment;
