var expressSession = require('express-session');
var RedisStore = require('connect-redis')(expressSession);

module.exports = function Sessions(options, secret) {
    return expressSession({
        secret: secret,
        store: new RedisStore(options),
        resave: true,
        saveUninitialized: true
    });
};
