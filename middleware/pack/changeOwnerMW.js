const requireOption = require('../requireOption');

module.exports = function(objectrepository) {

      return function(req, res, next) {
                let pack = res.locals.pack;
                let user = res.locals.newowner;
                pack.owner = user._id;
                pack.save((err) => {
                  if(err){
                    console.log("Couldnt save pack with new owner data");
                    console.log(err);
                  }
                });
                return res.redirect('/pack/' + res.locals.pack._id);
      };


};
