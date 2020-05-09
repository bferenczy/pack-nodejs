//finds user by email and checks if member

const requireOption = require('../requireOption');

module.exports = function(objectrepository) {


      const UserModel = requireOption(objectrepository, "UserModel");

      return function(req, res, next) {
          if(!req.body.transfer_email) {
            req.flash('error', 'No email was given!');
            return res.redirect('/pack/' + res.locals.pack._id);
          }
          UserModel.findOne({email: req.body.transfer_email}, (err, user) => {
              if(err || !user) {
                req.flash('error', 'No user found with given email!');
                console.log("Couldnt retrieve user with email (res.body) from database");
                console.log(err);
                return res.redirect('/pack/' + res.locals.pack._id);
              }

              if(res.locals.pack.members.indexOf(user._id) == -1) {
                req.flash('error', 'The given user is not a member of the group!');
                console.log(err);
                return res.redirect('/pack/' + res.locals.pack._id);
              }

              res.locals.newowner = user;
              return next();
          });
      };


};
