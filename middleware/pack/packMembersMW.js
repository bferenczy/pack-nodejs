/* For ajax queries */

const requireOption = require('../requireOption');


module.exports = function(objectrepository) {

  const UserModel = requireOption(objectrepository, "UserModel");
  const PackModel = requireOption(objectrepository, "PackModel");
    return function(req, res, next) {

          UserModel.find().where('_id').in(res.locals.pack.members).exec((err, users) => {
                if(err) {
                  return;
                }
                res.locals.members = users;
                return next();
              });

    };
};
