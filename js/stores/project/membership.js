var riot = require('riot');
var firebase = require('firebase');

module.exports = function() {
    riot.observable(this);

    var self = this;

    var fbRef = new firebase('https://bluebird.firebaseio.com/');

    // Allow membership.
    function allow(data) {
        // Use deny() to remove pending status.
        deny(data);
        // Add pid to member (user).
        fbRef.child('user_project/' + data.uid + '/member/' + data.pid).set(true);
        // Add uid to member (project).
        fbRef.child('member_status/' + data.pid + '/member/' + data.uid).set({role: 'assistant'});
    }

    // Deny membership.
    function deny(data) {
        // Remove pid from pending (user).
        fbRef.child('user_project/' + data.uid + '/pending/' + data.pid).remove();
        // Remove uid from pending (project).
        fbRef.child('member_status/' + data.pid + '/pending/' + data.uid).remove();
    }

    // Revoke membership.
    function revoke(data) {
        // Remove pid from member (user).
        fbRef.child('user_project/' + data.uid + '/member/' + data.pid).remove();
        // Remove uid from member (project).
        fbRef.child('member_status/' + data.pid + '/member/' + data.uid).remove();
    }

    self.on('membership_allow', allow);
    self.on('membership_deny', deny);
    self.on('membership_revoke', revoke);
};
