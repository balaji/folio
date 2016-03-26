exports.hasAuthToken = function(req, res, next) {
  if (req.session.accessToken) {
    return next();
  }
  res.redirect("/");
};
