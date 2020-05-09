const requireOption = require('../requireOption');

module.exports = function(objectrepository) {

  const PackModel = requireOption(objectrepository, "PackModel");
    return function(req, res, next) {
          if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
            return next();
          }
          if(!req.body.name || !req.body.icon || !req.body.description) {
            req.flash('error', "One or more fields were left empty!");
            return next();
          }

          let pack = res.locals.pack;
          pack.name = req.body.name;
          pack.icon = req.body.icon;
          pack.description = req.body.description;
          pack.save((err) => {
            console.log(err);
            res.locals.pack = pack;
          });

          return res.redirect('/pack/' + pack._id);

    };
};
