/* Check if current user is owner of the pack */

const requireOption = require('../requireOption');


module.exports = function(objectrepository) {


    return function(req, res, next) {


          if(res.locals.packOwner._id == req.session.user._id) {
            return next();
          }
          console.log("Not an owner.");
          req.flash('error', 'You are not the owner of this pack!');
          return res.redirect('/pack/' + req.params.packid);



    };
};
