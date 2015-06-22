var riot = require('riot');
var firebase = require('firebase');

module.exports = function() {
    riot.observable(this);

    var self = this, uid;

    var fbRef = new firebase('https://bluebird.firebaseio.com/');

    // Request status in project.
    function getStatus(pid) {
        uid = uid || fbRef.getAuth().uid;
        // Look for pending status.
        fbRef.child('pending/' + pid + '/' + uid).once('value', function(pendingSnap) {
            self.trigger('join_pending', !!pendingSnap.val(), pid);
        });
        // Look for member status.
        fbRef.child('member/' + pid + '/' + uid).once('value', function(memberSnap) {
            self.trigger('join_member', !!memberSnap.val(), pid);
        });
    }

    // Request to join project
    function joinProject(pid) {
        uid = uid || fbRef.getAuth().uid;
        // Add uid to pending/pid to notify project owner.
        fbRef.child('pending/' + pid + '/' + uid).set(true);
        // Add pid to user/uid/pending for reference.
        fbRef.child('user/' + uid + '/project/pending/' + pid).set(true);
    }

    self.on('join_status', getStatus)

    self.on('join_project', joinProject);
};
