const requireOption = require('../requireOption');


module.exports = function(objectrepository) {

  const PackModel = requireOption(objectrepository, "PackModel");
    return function(req, res, next) {
            PackModel.deleteOne({ _id: res.locals.pack._id },  (err, pack) => {
              if(err) {
                console.log("Error while deleting pack");
                return next(err);
              }
              next();
            });
        };
  };
