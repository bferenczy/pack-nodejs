/* Likes or unlikes the post recieved in body
* I didnt really want to divide this into
* multiple middlewares, I am sorry :(
*/
const requireOption = require('../requireOption');


module.exports = function(objectrepository) {

  const PostModel = requireOption(objectrepository, "PostModel");
  const LikeModel = requireOption(objectrepository, "LikeModel");

    return function(req, res, next) {

          PostModel.findById(req.body.postid).populate('likes').exec(function (err, post) {
            if(err) {
              console.log(err);
            }

            //Check if current user has liked the post
            let has = false;
            let hasId;
            post.likes.forEach((item, i) => {
                if(item.user == res.locals.user._id) has = true;
                hasId = item._id;
            });

            //If liked, then delete the like
            if(has){
                LikeModel.deleteOne({ _id: hasId },  (err, like) => {
                  if(err) {
                    console.log("Error while deleting like");
                  }
                  return next();
                });

            //If not, then add
            } else {
              let newLike = new LikeModel();
              newLike.post = post._id;
              newLike.user = res.locals.user._id;
              newLike.save((err) => {
                console.log(err);
              });
              post.likes.push(newLike._id);
              post.save((err) => {
                console.log(err);
              });
              return next();
            }
          });
    };
};
