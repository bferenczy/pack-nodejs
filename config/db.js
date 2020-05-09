const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/n51i83', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true,  useFindAndModify: false })
.then(() => console.log( 'Database Connected' ))
.catch(err => console.log( err ));;

module.exports = mongoose;
