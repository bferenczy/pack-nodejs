const requireOption = require('../requireOption');

module.exports = function(objectrepository) {

  const PackModel = requireOption(objectrepository, "PackModel");
    return function(req, res, next) {

      PackModel.findByIdAndUpdate(res.locals.pack._id,
          { $pullAll: { members: [res.locals.user._id] } },
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
