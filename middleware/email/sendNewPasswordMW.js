const requireOption = require('../requireOption');
const emailTransport = require('./emailTransport');

module.exports = function(objectrepository) {

  const UserModel = requireOption(objectrepository, "UserModel");
    return function(req, res, next) {

        if(req.flash('send') == 'ok') {
            let user = res.locals.usertoreset;
            const ejs = require("ejs");

            //Getting email path
            const path = require('path').resolve(__dirname) + '/emails/generic-template.ejs';

            //New Password Generation
            const niceware = require('niceware');
            const pwd = niceware.generatePassphrase(8).join('-');
            user.password = pwd;
            user.save((err) => {
              if(err) {
                console.log(err);
              }

              //Rendering email ejs
              ejs.renderFile(path, {
                title: "Your new password",
                greeting: "Hi " + user.username + ",",
                content: "Here is your new password: " + pwd,
                bye: "Have a nice day!"
               }, function (err, data) {
                  if (err) {
                      console.log(err);
                  }
                  //Preparing message transport
                  const transport = emailTransport();
                  const message = {
                      from: 'support@packs.com',
                      to: user.email,
                      subject: 'Packs | Your new password',
                      html: data,
                  };
                  //Sending email
                  transport.sendMail(message, function(err, info) {
                      if (err) {
                        console.log(err)
                      } else {
                        console.log(info);
                        req.flash('success', "Your new password has been sent to your account's email address!");
                        return res.redirect('/dashboard');
                      }
                  });
                });
            });
        } else {
          next();
        }
    };
};
