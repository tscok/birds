var riot = require('riot');
var firebase = require('firebase');

module.exports = function() {
    riot.observable(this);

    var self = this;

    var fbRef = new firebase('https://bluebird.firebaseio.com/');

    function getMembers(pid) {
        // Remove members who flagged themselves for removal.
        revokeMembership(pid);

        // Get member types.
        fbRef.child('member_status/' + pid).on('value', function(snap) {
            if (!snap.val()) {
                // No pending, no members. Trigger cancel event for loader…?
            }

            // Get members by type.
            snap.forEach(function(childSnap) {
                getMemberByType(childSnap, pid);
            });
        });
    }

    function getMemberByType(snap, pid) {
        var list = [];
        var type = snap.key();
        var count = snap.numChildren();

        snap.forEach(function(member) {
            fbRef.child('user/' + member.key()).once('value', function(user) {
                list.push({
                    uid: user.key(),
                    name: user.val().name,
                    pid: pid
                });

                if (count === list.length) {
                    self.trigger('members_listed', type, list);
                }
            });
        });
    }

    function revokeMembership(pid) {
        fbRef.child('member_status/' + pid + '/revoke/').once('value', function(snap) {
            snap.forEach(function(childSnap) {
                fbRef.child('member_status/' + pid + '/member/' + childSnap.key()).remove();
                fbRef.child('member_status/' + pid + '/revoke/' + childSnap.key()).remove();
            });
        });
    }

    self.on('list_members', getMembers);
};
