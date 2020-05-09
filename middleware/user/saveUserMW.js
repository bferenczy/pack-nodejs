// Saves changes made to the user
const requireOption = require('../requireOption');

module.exports = function(objectrepository) {

  const UserModel = requireOption(objectrepository, "UserModel");
    return function(req, res, next) {

        //Checks if there was any information in body previously, if not, next
        if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
          return next();
        }
        //Checks whether there was a field left empty and displays error message
        if(!req.body.username || !req.body.email || !req.body.password ){
            req.flash('error', "A field is missing (fill in your password as well!)");
            return next();
        }

        //Finds user and saves all changes (also updates session data)
        UserModel.findOne({ email: res.locals.user.email },  (err, user) => {
          if(err) {
            return next(err);
          }
            user.username = req.body.username;
            user.email = req.body.email;
            user.password = req.body.password;
            user.save((err) => {
              console.log(err);
            });
            req.session.user = user;
            return req.session.save(err => res.redirect('/dashboard'));
          });
    };
};
