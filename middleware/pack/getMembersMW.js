/* For ajax queries */

const requireOption = require('../requireOption');


module.exports = function(objectrepository) {


  const UserModel = requireOption(objectrepository, "UserModel");
  const PackModel = requireOption(objectrepository, "PackModel");
    return function(req, res) {
        PackModel.findById(req.params.packid,  (err, pack) => {
          if(err) {
            return;
          }
          UserModel.find().where('_id').in(pack.members).exec((err, users) => {
                if(err) {
                  return;
                }
                res.writeHead(200, {'content-type': 'text/json' });
                res.write( JSON.stringify(users) );
                res.end('\n');
                return res;
              });

          });




    };
};
