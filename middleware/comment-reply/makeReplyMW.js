/* For ajax queries */

const requireOption = require('../requireOption');


module.exports = function(objectrepository) {

  const CommentModel = requireOption(objectrepository, "CommentModel");
  const ReplyModel = requireOption(objectrepository, "ReplyModel");

    return function(req, res, next) {

          let reply = new ReplyModel();
          reply.user = res.locals.user._id;
          reply.comment = req.body.commentid;
          reply.text = req.body.text;
          var today = new Date();
          var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
          var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
          var dateTime = date+' '+time;
          reply.date = dateTime;
          reply.save((err) => {
            if(err)console.log(err);
            res.locals.reply = reply;
            next();
          });

    };
};
