const Schema = require('mongoose').Schema;
const db = require('../config/db', { useUnifiedTopology: true });

const Like = db.model('Like', {
    post: {type: Schema.Types.ObjectId, ref: 'Post'},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = Like;
