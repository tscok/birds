var riot = require('riot');
var firebase = require('firebase');

module.exports = function() {
    riot.observable(this);

    var self = this;

    var fbRef = new firebase('https://bluebird.firebaseio.com/');

    function getMembers(pid) {
        fbRef.child('member/' + pid).once('value', function(snap) {
            snap.forEach(function(childSnap) {
                // childSnap is either of type;
                // pending, granted, dormant or ignored.
                getMembersByType(childSnap);
            });
        });
    }

    function getMembersByType(snap) {
        var list = [];
        var type = snap.key();
        var userCount = snap.numChildren();

        snap.forEach(function(member) {
            fbRef.child('user/' + member.key()).once('value', function(user) {
                list.push({
                    uid: user.key(),
                    name: user.val().name
                });

                if (userCount === list.length) {
                    self.trigger('members', type, list);
                }
            });
        });
    }

    self.on('list_members', getMembers);
};
