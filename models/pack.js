const Schema = require('mongoose').Schema;
const db = require('../config/db', { useUnifiedTopology: true });

const Pack = db.model('Pack', {
    name: String,
    icon: String,
    description: String,
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    owner: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = Pack;
