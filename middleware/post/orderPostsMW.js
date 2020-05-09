const requireOption = require('../requireOption');

module.exports = function(objectrepository) {

  const PostModel = requireOption(objectrepository, "PostModel");
    return function(req, res, next) {

          if(!res.locals.posts) return next();
          res.locals.posts = res.locals.posts.sort((a, b) => b.date - a.date);
          res.locals.posts.forEach((post, i) => {
            if(post.comments) {
              post.comments = post.comments.sort((a, b) => b.date - a.date);
              if(post.comments.replies) {
                post.comments.replies.forEach((comment, i) => {
                  comment.replies = comment.replies.sort((a, b) => b.date - a.date);
                });
              }
            }
          });
          next();

    };
};
