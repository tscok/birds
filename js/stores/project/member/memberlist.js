var riot = require('riot');
var utils = require('../../../utils');
var fbRef = require('../../../firebase');

module.exports = function() {
    riot.observable(this);

    var self = this, pid;

    function init(projectId) {
        pid = projectId;

        // Get member types.
        fbRef.child('member_status/' + pid).on('value', function(snap) {
            if (!snap.exists()) {
                // No pending, no members. Trigger cancel event for loader…?
                self.trigger('memberlist_empty');
                return;
            }

            // Get members by type.
            snap.forEach(function(childSnap) {
                getMemberByType(childSnap);
            });
        });
    }

    function getMemberByType(snap) {
        var list = [];
        var type = snap.key();
        var count = snap.numChildren();

        snap.forEach(function(member) {

            fbRef.child('user/' + member.key()).once('value', function(user) {
                var userObj = {
                    uid: user.key(),
                    name: user.val().name,
                    pid: pid
                };

                if (type === 'member') {
                    list.push(utils.extend(member.val(), userObj));
                } else {
                    list.push(userObj);
                }

                if (count === list.length) {
                    self.trigger('memberlist_data', type, list);
                }
            });
        });
    }

    self.on('memberlist_init', init);
};
