
const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    const UserModel = requireOption(objectrepository, "UserModel");
    return function(req, res, next) {
      if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
        return next();
      }
        if (!req.body.email||!req.body.password ) {
          req.flash('error','Please fill in all fields!');
            return next();
        }

      if (req.body.email && req.body.password ) {
        UserModel.findOne({ email: req.body.email },  (err, user) => {
          if(err) {
            return next(err);
          }
          if(!user) {
            res.locals.error = 'Wrong email or password!';
            return next();
          }
          if (user.password === req.body.password) {
              req.session.user = user;
              return req.session.save(err => res.redirect('/dashboard'));
          }
          res.locals.error = 'Wrong email or password!';
          return next();

        });
      }



    };
};
