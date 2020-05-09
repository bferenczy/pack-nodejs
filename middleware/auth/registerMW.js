const requireOption = require('../requireOption');


module.exports = function(objectrepository) {

  const UserModel = requireOption(objectrepository, "UserModel");
    return function(req, res, next) {

        //Validation
        if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
          return next();
        }
        if (!req.body.email||!req.body.password||!req.body.username) {
          req.flash('error','Please fill in all fields!');
            return next();
        }

        //Creating user
        if (req.body.email && req.body.password && req.body.username) {
          UserModel.findOne({email: req.body.email}, (err,user) => {
            if(user) {
              req.flash('error','There is already a user with that email address!');
              return res.redirect("/register");
            }
            let newUser = new UserModel();
            newUser.username = req.body.username;
            newUser.email = req.body.email;
            newUser.password = req.body.password;
            newUser.save((err) => {
              req.flash('success','Successful registration! You can sign in now.');
              return res.redirect("/");
            });
          });
        } else {
          return res.redirect("/register");
        }
    };
};
