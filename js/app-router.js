var riot = require('riot');
var fbRef = require('./firebase');
var riotcontrol = require('riotcontrol');

module.exports = function() {

    var validRoute = {
        'login':    {uidReq: false},
        'profile':  {uidReq: true},
        'search':   {uidReq: true},
        'create':   {uidReq: true},
        'project':  {uidReq: true}
    };

    function authRoute(route) {
        var uid = fbRef.getAuth() ? fbRef.getAuth().uid : null;
        return validRoute[route].uidReq ? !!uid : true;
    }

    function validateRoute(route, id, action) {
        if (route == 'logout') {
            riotcontrol.trigger('logout');
            return;
        }

        if (route && validRoute[route]) {
            if (authRoute(route)) {
                riotcontrol.trigger('route', route, id, action);
                riotcontrol.trigger('alert_clear');
            } else {
                riotcontrol.trigger('alert', '404 - Unauthorized for route "' + route + '".', 'warning');
            }
        } else if (route && !validRoute[route]) {
            riotcontrol.trigger('alert', '404 - Route "' + route + '" not found.', 'warning');
        } else {
            riot.route('login');
        }
    }

    // Runs when URL changes.
    riot.route(validateRoute);

    // Runs on load/reload/refresh.
    riot.route.exec(validateRoute);

};
