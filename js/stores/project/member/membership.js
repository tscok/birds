var riot = require('riot');
var fbRef = require('../../../firebase');

module.exports = function() {
    riot.observable(this);

    var self = this;

    var onComplete = function(err) {
        if (err) {
            self.trigger('alert', err.message, 'warning');
        }
    };

    // Request membership.
    function request(data) {
        var uid = data.uid || fbRef.getAuth().uid;
        fbRef.child('membership/' + data.pid + '/pending/' + uid).set(true);
        fbRef.child('userproject/' + uid + '/pending/' + data.pid).set(true);
    }

    // Deny membership request.
    function deny(data) {
        var uid = data.uid || fbRef.getAuth().uid;
        fbRef.child('userproject/' + uid + '/pending/' + data.pid).remove(onComplete);
        fbRef.child('membership/' + data.pid + '/pending/' + uid).remove(onComplete);
    }

    // Allow membership request.
    function allow(data) {
        deny(data); // Remove pending status by calling deny().
        fbRef.child('userproject/' + data.uid + '/member/' + data.pid).set(true);
        fbRef.child('membership/' + data.pid + '/member/' + data.uid).set({role: 'assistant'});
    }

    // Revoke membership.
    function revoke(data) {
        var uid = data.uid || fbRef.getAuth().uid;
        fbRef.child('userproject/' + uid + '/member/' + data.pid).remove();
        fbRef.child('membership/' + data.pid + '/member/' + uid).remove();
    }

    // Validate membership (on route).
    function validate(route, id) {
        if (route != 'project') { return; }
        var pid = id;
        var uid = fbRef.getAuth().uid;
        var msg = 'Access denied. Membership required.';
        var membership = fbRef.child('membership/' + pid + '/member/' + uid);
        var ownership = fbRef.child('project/' + pid + '/userId');
        ownership.once('value', function(owner) {
            if (owner.val() !== uid ) {
                membership();
            }
        });
        function membership() {
            membership.once('value', function(member) {
                if (!member.exists()) {
                    self.trigger('alert', msg, 'error');
                    riot.route('profile');
                }
            });
        }
    }

    self.on('membership_request', request);
    self.on('membership_deny', deny);
    self.on('membership_allow', allow);
    self.on('membership_revoke', revoke);
    self.on('route', validate);
};
