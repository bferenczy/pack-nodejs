const renderMW = require('../middleware/renderMW.js');

//Auth
const checkPassMW = require('../middleware/auth/checkPassMW.js');
const authMW = require('../middleware/auth/authMW.js');
const logoutMW = require('../middleware/auth/logoutMW.js');
const registerMW = require('../middleware/auth/registerMW.js');
const ownerMW = require('../middleware/auth/ownerMW.js');
const memberMW = require('../middleware/auth/memberMW.js');
const getUserForResetMW = require('../middleware/auth/getUserForResetMW.js');
const postModificationAuthMW = require('../middleware/auth/postModificationAuthMW.js');
const leaveAsOwnerAuthMW = require('../middleware/auth/leaveAsOwnerAuthMW.js');

//Comment-reply
const makeCommentMW = require('../middleware/comment-reply/makeCommentMW.js');
const addCommentToPostMW = require('../middleware/comment-reply/addCommentToPostMW.js');
const makeReplyMW = require('../middleware/comment-reply/makeReplyMW.js');
const addReplyToCommentMW = require('../middleware/comment-reply/addReplyToCommentMW.js');
const getCommentsMW = require('../middleware/comment-reply/getCommentsMW.js');
const getRepliesMW = require('../middleware/comment-reply/getRepliesMW.js');
const deleteCommentsMW = require('../middleware/comment-reply/deleteCommentsMW.js');
const deleteRepliesMW = require('../middleware/comment-reply/deleteRepliesMW.js');

//Email
const sendNewPasswordMW = require('../middleware/email/sendNewPasswordMW.js');

//Pack
const changeOwnerMW = require('../middleware/pack/changeOwnerMW.js');
const getNewOwnerMW = require('../middleware/pack/getNewOwnerMW.js');
const getPackOwnerMW = require('../middleware/pack/getPackOwnerMW.js');
const deletePackMW = require('../middleware/pack/deletePackMW.js');
const getMembersMW = require('../middleware/pack/getMembersMW.js');
const getPackMW = require('../middleware/pack/getPackMW.js');
const getPacksMW = require('../middleware/pack/getPacksMW.js');
const inviteMW = require('../middleware/pack/inviteMW.js');
const makePackMW = require('../middleware/pack/makePackMW.js');
const savePackMW = require('../middleware/pack/savePackMW.js');
const leavePackMW = require('../middleware/pack/leavePackMW.js');
const packMembersMW = require('../middleware/pack/packMembersMW.js');
const removeMemberMW = require('../middleware/pack/removeMemberMW.js');

//User
const saveUserMW = require('../middleware/user/saveUserMW.js');
const delUserMW = require('../middleware/user/delUserMW.js');

//Post
const makePostMW = require('../middleware/post/makePostMW.js');
const getPostMW = require('../middleware/post/getPostMW.js');
const getPostsMW = require('../middleware/post/getPostsMW.js');
const deletePostMW = require('../middleware/post/deletePostMW.js');
const deletePostsMW = require('../middleware/post/deletePostsMW.js');
const editPostMW = require('../middleware/post/editPostMW.js');
const likeMW = require('../middleware/post/likeMW.js');
const getFreshPostsMW = require('../middleware/post/getFreshPostsMW.js');
const orderPostsMW = require('../middleware/post/orderPostsMW.js');
const getCommentCountForPostsMW = require('../middleware/post/getCommentCountForPostsMW.js');

//Validation


const PackModel = require('../models/pack');
const UserModel = require('../models/user');
const PostModel = require('../models/post');
const LikeModel = require('../models/like');
const CommentModel = require('../models/comment');
const ReplyModel = require('../models/reply');

module.exports = function(app) {

  const objRepo = {
    PackModel: PackModel,
    UserModel: UserModel,
    PostModel: PostModel,
    LikeModel: LikeModel,
    CommentModel: CommentModel,
    ReplyModel: ReplyModel,
  };

    //Making logged in user session data available in locals
    app.use(function(req, res, next) {
      if(req.session.user) res.locals.user = req.session.user;
      next();
    });


    app.get('/member-query/:packid', authMW(objRepo), getMembersMW(objRepo));
    app.post('/confirm-leave/:packid', authMW(objRepo), getPackMW(objRepo), getPackOwnerMW(objRepo), getPacksMW(objRepo), leaveAsOwnerAuthMW(objRepo), leavePackMW(objRepo), renderMW("leave"));
    app.use('/register', registerMW(objRepo), renderMW("register"));
    app.get('/logout', logoutMW());
    app.use('/profile', authMW(objRepo), getPacksMW(objRepo), saveUserMW(objRepo), renderMW("profile"))
    app.post('/delete', authMW(objRepo), getPacksMW(objRepo), delUserMW(objRepo));

    app.get( '/dashboard', authMW(), getPacksMW(objRepo), getFreshPostsMW(objRepo), orderPostsMW(objRepo), getCommentCountForPostsMW(objRepo), renderMW("dashboard"));

    app.use('/pack/new', authMW(objRepo), getPacksMW(objRepo), makePackMW(objRepo), renderMW("add"));
    app.get('/pack/:packid/leave', authMW(objRepo), getPackMW(objRepo), getPackOwnerMW(objRepo), memberMW(objRepo), getPacksMW(objRepo),  renderMW("leave"));
    app.use('/pack/:packid/invite', authMW(objRepo), getPackMW(objRepo), getPackOwnerMW(objRepo), memberMW(objRepo), getPacksMW(objRepo),  inviteMW(objRepo), renderMW("invite"));
    app.use('/pack/:packid/settings', authMW(objRepo), getPackMW(objRepo), getPackOwnerMW(objRepo), memberMW(objRepo), ownerMW(objRepo), getPacksMW(objRepo),  packMembersMW(objRepo), savePackMW(objRepo), renderMW("packsettings"));
    app.post('/:packid/remove-member', authMW(objRepo), getPackMW(objRepo), getPackOwnerMW(objRepo), memberMW(objRepo), getPacksMW(objRepo), removeMemberMW(objRepo));
    app.post('/:packid/change-owner', authMW(objRepo), getPackMW(objRepo), getPackOwnerMW(objRepo), memberMW(objRepo), ownerMW(objRepo), getNewOwnerMW(objRepo), changeOwnerMW(objRepo), getPacksMW(objRepo), removeMemberMW(objRepo));
    app.post('/:packid/delete', authMW(objRepo), getPackMW(objRepo), getPackOwnerMW(objRepo), memberMW(objRepo), ownerMW(objRepo), getPostsMW(objRepo), deletePackMW(objRepo), deletePostsMW(objRepo), getCommentsMW(objRepo), deleteCommentsMW(objRepo), getRepliesMW(objRepo), deleteRepliesMW(objRepo));
    app.get( '/pack/:packid', authMW(), getPackMW(objRepo), getPackOwnerMW(objRepo), memberMW(objRepo),  getPacksMW(objRepo), getPostsMW(objRepo),orderPostsMW(objRepo), getCommentCountForPostsMW(objRepo), renderMW("pack"));
    app.post('/:packid/new-post', authMW(), getPackMW(objRepo), getPackOwnerMW(objRepo), memberMW(objRepo), makePostMW(objRepo));
    app.post('/delete-post', authMW(), getPostMW(objRepo), postModificationAuthMW(objRepo), deletePostMW(objRepo), deletePostsMW(objRepo), getCommentsMW(objRepo), deleteCommentsMW(objRepo), getRepliesMW(objRepo), deleteRepliesMW(objRepo));
    app.post('/edit-post', authMW(), getPostMW(objRepo), postModificationAuthMW(objRepo), editPostMW(objRepo));
    app.post('/comment', authMW(), makeCommentMW(objRepo), addCommentToPostMW(objRepo));
    app.post('/like', authMW(), likeMW(objRepo));
    app.post('/reply', authMW(), makeReplyMW(objRepo), addReplyToCommentMW(objRepo));

    app.use('/forgotten-password', getUserForResetMW(objRepo), sendNewPasswordMW(objRepo), renderMW("forgotten-password"));

    app.use( '/', checkPassMW(objRepo), renderMW("index"));
};
