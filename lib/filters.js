exports.hasAuthToken = function (req, res, next) {
    if (req.session.llToken) {
        return next();
    }
    res.redirect("/");
};
