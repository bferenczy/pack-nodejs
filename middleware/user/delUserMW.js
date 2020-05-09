// Deletes the user and removes it from the Packs it was a member in.

const requireOption = require('../requireOption');

module.exports = function(objectrepository) {

  const UserModel = requireOption(objectrepository, "UserModel");
  const PackModel = requireOption(objectrepository, "PackModel");
    return function(req, res, next) {

        UserModel.deleteOne({ email: res.locals.user.email },  (err, user) => {
          if(err) {
            return next(err);
          }
          PackModel.updateMany({member: res.locals.user_id},
              { $pullAll: { members: [res.locals.user._id] } },
              { new: true },
              function(err, data) {
                if(err) {
                  return next(err);
                }
                req.session.destroy(err => {
                    res.redirect('/');
                });
              }
          );
          });

    };
};
