var riot = require('riot');
var firebase = require('firebase');

module.exports = function() {
    riot.observable(this);

    var self = this;

    var fbRef = new firebase('https://bluebird.firebaseio.com/');

    function allow(data) {
        // Allow membership.
        
        deny(data);
        
        // Add pid to member (user).
        fbRef.child('user_project/' + data.uid + '/member/' + data.pid).set(true);

        // Add uid to member (project).
        fbRef.child('member_status/' + data.pid + '/member/' + data.uid).set(true);

        // Add uid to assistant (default project_role).
        fbRef.child('member_role/' + data.pid + '/assistant/' + data.uid).set(true);
    }

    function deny(data) {
        // Deny membership.
        
        // Remove pid from pending (user).
        fbRef.child('user_project/' + data.uid + '/pending/' + data.pid).remove();

        // Remove uid from pending (project).
        fbRef.child('member_status/' + data.pid + '/pending/' + data.uid).remove();
    }

    self.on('membership_allow', allow);
    self.on('membership_deny', deny);
};
