//TODO: Check if there is any other way. Made a global variable for click events.
folioFbLogin = require('./facebook-login');

require('./folio-app/module');
function requireAll(r) { r.keys().forEach(r); }
requireAll(require.context('./folio-app/', true, /\.js$/));
