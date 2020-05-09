/* Check if current user is member of the pack */

const requireOption = require('../requireOption');


module.exports = function(objectrepository) {

    return function(req, res, next) {

          if(res.locals.pack.members.indexOf(req.session.user._id) != -1) {
            return next();
          }
          res.locals.pack = "";
          req.flash('error', 'You are not a member of this pack!');
          return res.redirect('/dashboard');

    };
};
