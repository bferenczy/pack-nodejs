/* For ajax queries */

const requireOption = require('../requireOption');

module.exports = function(objectrepository) {

  const CommentModel = requireOption(objectrepository, "CommentModel");
    return function(req, res, next) {
          CommentModel.findById(req.body.commentid, (err, model) => {
            if(err) {
              console.log(err); return next();
            }
            if(!model) {
              console.log("comment not found");
            }
            model.replies.push(res.locals.reply._id);
            model.save((err) => {
              if(err)console.log(err);
              return res.send(res.locals.reply._id);
            });
          });
    };
};
