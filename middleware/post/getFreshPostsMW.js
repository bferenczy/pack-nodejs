//Gets the latest post from wach pack
const requireOption = require('../requireOption');

module.exports = function(objectrepository) {

  const PostModel = requireOption(objectrepository, "PostModel");
    return function(req, res, next) {

        //Getting all pack ids
        let packIDs = [];
        res.locals.packs.forEach((pack, i) => {
          packIDs.push(pack._id)
        });

        //Gets the latest post from a pack by its id
        function findPost(id){
          return PostModel.findOne({pack: id}).sort({date: -1}).populate('user').populate('pack').populate({ path: 'comments', populate: { path: 'replies', populate: { path: 'user' }}}).populate({ path: 'likes', populate: { path: 'user' }}).populate({ path: 'comments', populate: { path: 'user' }}).exec();
        }

        //Making a findPost function for every pack id
        const promises = packIDs.map(findPost);

        //Running all findPost functions
        Promise.all(promises).then(posts => {
          //Some packs might return nothing, we have to take care of tat
          let nullsRemoved = [];
          posts.forEach((post, i) => {
            if(post !== null) nullsRemoved.push(post);
          });
          //If there are posts left, then return them
          if(0 < nullsRemoved.length) res.locals.posts = nullsRemoved;
          next();
        }).catch(function(e){
          console.log(e);
          next();
        });
    };
};
