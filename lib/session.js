var expressSession = require('express-session');
var RedisStore = require('connect-redis')(expressSession);

module.exports = function Sessions(options, secret) {
  var store = new RedisStore(options);
  var session = expressSession({
    secret: secret,
    store: store,
    resave: true,
    saveUninitialized: true
  });

  return session;
};
