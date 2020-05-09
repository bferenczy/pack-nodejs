//Deletes the post (AJAX)

const requireOption = require('../requireOption');
module.exports = function(objectrepository) {

  const CommentModel = requireOption(objectrepository, "CommentModel");
    return function(req, res, next) {
          CommentModel.find({ post: {$in: req.locals.postids} }, (err, comments) =>{
            if(err) {
              console.log("Error while finding comments");
              return next(err);
            }
            res.locals.comments = comments;
            next();
          });

      };

};
