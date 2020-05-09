const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
  const PackModel = requireOption(objectrepository, "PackModel");
    return function(req, res, next) {

        PackModel.findById(req.params.packid,  (err, pack) => {
          if(err || !pack) {
            req.flash('error', 'Pack not found!');
            res.redirect('/dashboard');
            return;
          }
          res.locals.pack = pack;
          next();

        });
    };
};
