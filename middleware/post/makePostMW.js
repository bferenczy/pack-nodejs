/* For ajax queries */

const requireOption = require('../requireOption');


module.exports = function(objectrepository) {

  const PostModel = requireOption(objectrepository, "PostModel");

    return function(req, res, next) {

          let newPost = new PostModel();
          newPost.user = res.locals.user._id;
          newPost.pack = res.locals.pack._id;
          newPost.text = req.body.text;
          var today = new Date();
          var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
          var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
          var dateTime = date+' '+time;
          newPost.date = dateTime;
          newPost.like = 0
          newPost.save((err) => {
            console.log(err);
          });
          return res.send(newPost._id);
    };
};
