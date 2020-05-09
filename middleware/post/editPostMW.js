//Saves changes to post by text recieved in body (AJAX)
const requireOption = require('../requireOption');

module.exports = function(objectrepository) {

  const PostModel = requireOption(objectrepository, "PostModel");
    return function(req, res, next) {
        let post = res.locals.post;
        post.text = req.body.text;
        post.save((err) => {
          console.log(err);
        });
        return next();
    };
};
