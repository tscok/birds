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
        fbRef.child('user_project/' + uid + '/pending/' + pid).once('value', function(pendingSnap) {
            self.trigger('join_pending', !!pendingSnap.val(), pid);
        });

        // Look for member status.
        fbRef.child('user_project/' + uid + '/member/' + pid).once('value', function(memberSnap) {
            self.trigger('join_member', !!memberSnap.val(), pid);
        });
    }

    // Request to join project
    function joinProject(pid) {
        // Add uid to pending (project) to notify project owner.
        fbRef.child('member_status/' + pid + '/pending/' + uid).set(true);
        // Add pid to pending (user) for reference.
        fbRef.child('user_project/' + uid + '/pending/' + pid).set(true);
    }

    // Undo membership request
    function joinUndo(pid) {
        // Remove uid from pending (project).
        fbRef.child('member_status/' + pid + '/pending/' + uid).remove();
        // Remove pid from pending (user).
        fbRef.child('user_project/' + uid + '/pending/' + pid).remove();
    }

    self.on('join_status', getStatus)

    self.on('join_project', joinProject);

    self.on('join_undo', joinUndo)
};
