/* For ajax queries */

const requireOption = require('../requireOption');


module.exports = function(objectrepository) {

  const PostModel = requireOption(objectrepository, "PostModel");

    return function(req, res, next) {

          PostModel.findById(req.body.postid, (err, model) => {
            if(err) {
              console.log(err); return next();
            }
            if(!model) {
              console.log("post not found");
            }
            model.comments.push(res.locals.newcomment._id);
            model.save((err) => {
              if(err)console.log(err);
              return res.send(res.locals.newcomment._id);
            });
          });


    };
};
