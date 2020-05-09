//Deletes the post (AJAX)

const requireOption = require('../requireOption');
module.exports = function(objectrepository) {

  const ReplyModel = requireOption(objectrepository, "ReplyModel");
    return function(req, res, next) {

          let replyids = [];
          res.locals.replies.forEach((reply, i) => {
            replyids.push(reply._id);
          });
          ReplyModel.deleteMany({ _id: {$in: replyids }}, (err, replies) =>{
            if(err) {
              console.log("Error while deleting comments");
              return next(err);
            }
            return next();
          });
        };
};
