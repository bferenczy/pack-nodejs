const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
  const UserModel = requireOption(objectrepository, "UserModel");
    return function(req, res, next) {

            UserModel.findById(res.locals.pack.owner,  (err, user) => {
              if(err) {
                return next(err);
              }
                res.locals.packOwner = user;
                next();
              });
    };
};
