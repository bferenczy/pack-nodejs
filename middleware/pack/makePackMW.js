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

          let newPack = new PackModel();
          newPack.name = req.body.name;
          newPack.icon = req.body.icon;
          newPack.description = req.body.description;
          newPack.owner = res.locals.user._id;
          newPack.members.push(res.locals.user._id);
          newPack.save((err) => {
            console.log(err);
              return res.redirect('/pack/' + newPack._id);
          });



    };
};
