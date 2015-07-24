var riot = require('riot');
var firebase = require('firebase');

module.exports = function() {
    riot.observable(this);

    var self = this, uid, pid;

    var fbRef = new firebase('https://bluebird.firebaseio.com/');

    function leaveProject(project_id) {
        uid = fbRef.getAuth().uid;
        pid = project_id;

        // Member status: Pending.
        fbRef.child('user_project/' + uid + '/pending/' + pid).once('value', function(snap) {
            if (snap.val()) {
                removePending();
            }
        });

        // Member status: Member.
        fbRef.child('user_project/' + uid + '/member/' + pid).once('value', function(snap) {
            if (snap.val()) {
                removeMember();
            }
        });
    }

    function removePending() {
        fbRef.child('member_status/' + pid + '/pending/' + uid).remove();
        fbRef.child('user_project/' + uid + '/pending/' + pid).remove();
    }

    function removeMember() {
        fbRef.child('member_status/' + pid + '/revoke/' + uid).set(true);
        fbRef.child('user_project/' + uid + '/member/' + pid).remove();
    }

    self.on('leave_project', leaveProject)
};