const Schema = require('mongoose').Schema;
const db = require('../config/db', { useUnifiedTopology: true });

const Post = db.model('Post', {
    text: String,
    date: Date,
    pack: { type: Schema.Types.ObjectId, ref: 'Pack' },
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    likes: [{type: Schema.Types.ObjectId, ref: 'Like'}],
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});

module.exports = Post;
