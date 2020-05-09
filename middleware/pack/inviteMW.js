const requireOption = require('../requireOption');

module.exports = function(objectrepository) {

  const PackModel = requireOption(objectrepository, "PackModel");
  const UserModel = requireOption(objectrepository, "UserModel");
    return function(req, res, next) {
          if(!req.body.emails) {
            return next();
          }
              UserModel.find({ email: {$in: JSON.parse(req.body.emails)} },  (err, users) => {
                if(err || users.length == 0) {
                  console.log("No user with email.");
                  req.flash('error', 'No user found with given email!');
                  res.redirect('/pack/' + res.locals.pack._id);
                  return;
                }

                PackModel.findById(req.params.packid,  (err, pack) => {
                    if(err) {
                      return next(err);
                    }
                    let idArray = [];
                    users.forEach((item, i) => {
                      if(res.locals.pack.members.indexOf(item._id) === -1 ){
                        idArray.push(item._id);
                      } else {
                        req.flash('error', 'Some of the invited users are already a member of this group!');
                      }
                    });
                    if (idArray && idArray.length) {
                      idArray.forEach((item, i) => {
                          pack.members.push(item)
                      });
                    }
                    pack.save((err) => {
                      console.log(err);
                    });
                    return res.redirect('/pack/' + req.params.packid);

                });

            });
          };
};
