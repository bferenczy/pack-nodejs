/* For ajax queries */

const requireOption = require('../requireOption');
module.exports = function(objectrepository) {

  const CommentModel = requireOption(objectrepository, "CommentModel");

    return function(req, res, next) {

          let newComment = new CommentModel();
          newComment.user = res.locals.user._id;
          newComment.post = req.body.postid;
          newComment.text = req.body.text;
          var today = new Date();
          var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
          var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
          var dateTime = date+' '+time;
          newComment.date = dateTime;
          newComment.save((err) => {
            if(err)console.log(err);
            res.locals.newcomment = newComment;
            return next();
          });
    };
};
