const requireOption = require('../requireOption');

module.exports = function(objectrepository) {

  const PostModel = requireOption(objectrepository, "PostModel");
    return function(req, res, next) {
      //Sorting by date and populating all fields for easy display on frontend
      PostModel.find({ pack: res.locals.pack._id }).sort({date: -1}).populate('user').populate('pack').populate({ path: 'comments', populate: { path: 'replies', populate: { path: 'user' }}}).populate({ path: 'likes', populate: { path: 'user' }}).populate({ path: 'comments', populate: { path: 'user' }}).exec(function (err, posts) {
        if(err) {
          console.log(err);
        }
        res.locals.posts = posts;
        next();

      });
    };
};
