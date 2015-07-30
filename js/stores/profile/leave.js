var riot = require('riot');
var firebase = require('firebase');

module.exports = function() {
    riot.observable(this);

    var self = this;

    var fbRef = new firebase('https://bluebird.firebaseio.com/');

    function leaveProject(project_id) {
        var uid = fbRef.getAuth().uid;
        var pid = project_id;

        var userSnap = fbRef.child('user_project/' + uid);
        var memberSnap = fbRef.child('member_status/' + pid);

        // Member status: Pending.
        userSnap.child('/pending/' + pid).once('value', function(snap) {
            if (snap.exists()) {
                removePending();
            }
        });

        // Member status: Member.
        userSnap.child('/member/' + pid).once('value', function(snap) {
            if (snap.exists()) {
                removeMember();
            }
        });

        function removePending() {
            memberSnap.child('/pending/' + uid).remove();
            userSnap.child('/pending/' + pid).remove();
        }

        function removeMember() {
            memberSnap.child('/member/' + uid).remove();
            userSnap.child('/member/' + pid).remove();
        }
    }

    self.on('leave_project', leaveProject)
};
