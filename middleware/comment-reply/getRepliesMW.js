//Deletes the post (AJAX)

const requireOption = require('../requireOption');
module.exports = function(objectrepository) {

  const ReplyModel = requireOption(objectrepository, "ReplyModel");
    return function(req, res, next) {

          ReplyModel.find({ comment: {$in: res.locals.commentids} }, (err, replies) =>{
            if(err) {
              console.log("Error while finding replies");
              return next(err);
            }
            res.locals.replies = replies;
            next();
          });

        };
};
