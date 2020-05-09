module.exports = function(objectrepository) {
    return function(req, res, next) {
        if (!req.session.user) {
            return res.redirect('/');
        }
        next();
    };
};
