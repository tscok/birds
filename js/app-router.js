var riot = require('riot');
var promise = require('promise');
var riotcontrol = require('riotcontrol');
var fbRef = require('./firebase');

module.exports = function() {

    var validRoute = {
        'login':    {uidReq: false},
        'profile':  {uidReq: true},
        'search':   {uidReq: true},
        'create':   {uidReq: true},
        'project':  {uidReq: true}
    };

    function authProjectAccess(uid, id) {
        return new promise(function(resolve, reject) {
            fbRef.child('membership/' + id + '/member/' + uid).once('value', function(member) {
                fbRef.child('project/' + id + '/userId').once('value', function(ownerId) {
                    resolve({
                        isMember: member.exists(),
                        isOwner: ownerId.val() == uid
                    });
                });
            });
        });
    }

    function validateRoute(route, id, action) {
        var uid = fbRef.getAuth() ? fbRef.getAuth().uid : null;

        // Show login.
        if (route == 'login') {
            riotcontrol.trigger('route', 'login');
            return;
        }

        // unAuth and trigger login.
        if (route == 'logout' || !route || !uid) {
            riotcontrol.trigger('logout');
            return;
        }

        // Route is undefined.
        if (!validRoute[route]) {
            riotcontrol.trigger('alert', '404 - Route "' + route + '" not found.', 'warning');
            return;
        }
        
        // Route is valid and auth is required.
        if (validRoute[route] && validRoute[route].uidReq) {

            // Route is anything but 'project'.
            if (route != 'project') {
                riotcontrol.trigger('route', route);
                return;
            }

            // Project route missing ID.
            if (route == 'project' && !id) {
                riot.route('profile');
                return;
            }

            // Project route and ID is defined.
            authProjectAccess(uid, id).then(function(status) {
                var msg = 'Access denied. Membership required.';
                
                // Access to project denied.
                if (!status.isMember && !status.isOwner) {
                    riotcontrol.trigger('alert', msg, 'error');
                    riot.route('profile');
                    return;
                }

                // Access verified.
                riotcontrol.trigger('route', route, id, action);
            });
        }
    }

    // Runs when URL changes.
    riot.route(validateRoute);

    // Runs on load/reload/refresh.
    riot.route.exec(validateRoute);
};
