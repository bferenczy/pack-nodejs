const requireOption = require('../requireOption');

module.exports = function(objectrepository) {

  const PostModel = requireOption(objectrepository, "PostModel");
    return function(req, res, next) {

        if(!res.locals.posts) return next();

          res.locals.posts.forEach((post, i) => {
            let commentNum = 0;
            post.comments.forEach((comment, i) => {
              commentNum++;
              comment.replies.forEach((reply, i) => {
                commentNum++;
              });
            });
            post.commentNum = commentNum;
          });
          next();
    };
};
