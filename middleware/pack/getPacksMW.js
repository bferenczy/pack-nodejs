const requireOption = require('../requireOption');

module.exports = function(objectrepository) {

  const PackModel = requireOption(objectrepository, "PackModel");
    return function(req, res, next) {
        PackModel.find({ members: res.locals.user._id },  (err, packs) => {
          if(err) {
            return next(err);
          }
            res.locals.packs = packs;
            next();
          });
    };
};
