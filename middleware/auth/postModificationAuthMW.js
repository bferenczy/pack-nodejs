//Checks if user has rights to delete the post (AJAX)
const requireOption = require('../requireOption');
module.exports = function(objectrepository) {
    return function(req, res, next) {
          if(res.locals.post.user != res.locals.user._id) {
              console.log("Deleting others posts is not allowed.");
              return redirect("/dashboard");
          }
         return next();

    };
};
