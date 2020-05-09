//Sets up posts array for deletePostsMW

const requireOption = require('../requireOption');
module.exports = function(objectrepository) {

    return function(req, res, next) {

      res.locals.posts = [ res.locals.post ];
      return next();

    };
};
