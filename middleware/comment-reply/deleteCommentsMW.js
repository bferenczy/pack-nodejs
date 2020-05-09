//Deletes the post (AJAX)

const requireOption = require('../requireOption');
module.exports = function(objectrepository) {

  const CommentModel = requireOption(objectrepository, "CommentModel");
  const ReplyModel = requireOption(objectrepository, "ReplyModel");
    return function(req, res, next) {

            let commentids = [];
            res.locals.comments.forEach((comment, i) => {
              commentids.push(comment._id);
            });
            res.locals.commentids = commentids;
            CommentModel.deleteMany({ _id: {$in: commentids }}, (err, comments) =>{
              if(err) {
                console.log("Error while deleting comments");
                return next(err);
              }
              return next();
            });

      };

};
