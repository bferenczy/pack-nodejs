//As a pack owner you cant leave the pack
const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    return function(req, res, next) {
      if(res.locals.pack.owner == res.locals.user._id) {
        req.flash('error', "You can't leave the pack, as you are its owner !");
        res.redirect('/pack/' + res.locals.pack._id);
        return;
      }
      next();
    };
};
