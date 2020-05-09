/* For ajax queries */

const requireOption = require('../requireOption');


module.exports = function(objectrepository) {

  const PackModel = requireOption(objectrepository, "PackModel");
    return function(req, res) {

          if(req.body.memberid == res.locals.user._id) {
            req.flash('error', "You can't leave the pack, as you are its owner !");
            res.redirect('/pack/' + res.locals.pack._id);
            return;
          }
          PackModel.findByIdAndUpdate(req.body.packid,
              { $pullAll: { members: [req.body.memberid] } },
              { new: true },
              function(err, data) {
                if(err) {
                  return next(err);
                }
                return res.redirect('/dashboard');
              }
          );


    };
};
