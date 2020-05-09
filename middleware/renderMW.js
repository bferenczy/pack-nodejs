module.exports = function(pageToRender) {
    return function(req, res, next) {

        //For displaying error and success messages
        var content = req.flash('error');
        if(0< content.length)res.locals.error = content;
        var success = req.flash('success');
        if(0< success.length)res.locals.success = success;

        res.render(pageToRender);
    };
};
