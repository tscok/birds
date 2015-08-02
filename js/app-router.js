var riot = require('riot');
var riotcontrol = require('riotcontrol');
var fbRef = require('./firebase');

module.exports = function() {

    var lastRoute = '';

    function validateRoute(route, id, action) {
        var uid = fbRef.getAuth() ? fbRef.getAuth().uid : null;

        // All valid routes and auth requirements.
        var routes = {
            'login':    {authRequired: false},
            'register': {authRequired: false},
            'profile':  {authRequired: true},
            'search':   {authRequired: true},
            'create':   {authRequired: true},
            'project':  {authRequired: true}
        };

        if (route) {
            if (routes[route]) {
                var unauthorized = routes[route].authRequired && !uid;
                var leaveAuthReq = !routes[route].authRequired && uid;
                if (unauthorized || leaveAuthReq) {
                    riotcontrol.trigger('logout');
                } else {
                    riotcontrol.trigger('proxy_route', route, id, action);

                    console.log('route to', route, 'from', lastRoute || '??');
                    lastRoute = route;
                }
            } else {
                riotcontrol.trigger('alert', '404 - Route not found.', 'error');
            }
        } else {
            riotcontrol.trigger('logout');
        }
    }

    // Runs when URL changes.
    riot.route(validateRoute);

    // Runs on load/reload/refresh.
    riot.route.exec(validateRoute);
};
