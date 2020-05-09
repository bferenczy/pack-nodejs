//For AJAX - gets post by postid sent in body
const requireOption = require('../requireOption');

module.exports = function(objectrepository) {

  const PostModel = requireOption(objectrepository, "PostModel");
    return function(req, res, next) {
      PostModel.findOne({ _id: req.body.postid },  (err, post) => {
        //Error messages
            if(err) {
              console.log("Error while finding post");
              return next(err);
            }
            if(!post) {
              console.log("Couldnt find post!");
              return next(err);
            }
        res.locals.post = post;
        return next();
      });
    };
};
