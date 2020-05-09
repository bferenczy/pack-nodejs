//Gets the user by email or username for email sending
const requireOption = require('../requireOption');

module.exports = function(objectrepository) {

  const UserModel = requireOption(objectrepository, "UserModel");
    return function(req, res, next) {
          //Validation
          if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
            return next();
          }
          if(!req.body.username && !req.body.email) {
            req.flash('error', 'One or more fields were not filled!');
            return next();
          }
          //If username was given
          if(req.body.username) {
            UserModel.findOne({username: req.body.username}).exec(function(err, user){
              if(err) {
                console.log(err);
                return next();
              }
              if(!user){
                req.flash('error', "User not found!");
                return next();
              }
              res.locals.usertoreset = user;
              req.flash('send', 'ok');
              return next();
            });
          //If email was given
          } else if (req.body.email){
            UserModel.findOne({email: req.body.email}).exec(function(err, user){
              if(err) {
                console.log(err);
                return next();
              }
              if(!user){
                req.flash('error', "User not found!");
                return next();
              }
              res.locals.usertoreset = user;
              req.flash('send', 'ok');
              return next();
          });
        }
    };
};
