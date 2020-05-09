//Deletes the post (AJAX)

const requireOption = require('../requireOption');
module.exports = function(objectrepository) {
  const PostModel = requireOption(objectrepository, "PostModel");
  const CommentModel = requireOption(objectrepository, "CommentModel");
  const ReplyModel = requireOption(objectrepository, "ReplyModel");
    return function(req, res, next) {

      let postids = [];
      res.locals.posts.forEach((post, i) => {
        postids.push(post._id);
      });
      res.locals.postids = postids;
      PostModel.deleteMany({ _id: {$in: postids }}, (err, posts) =>{
        if(err) {
          console.log("Error while deleting posts");
          return next(err);
        }
        console.log(posts);
        next();
      });
};
};
