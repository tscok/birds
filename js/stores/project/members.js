var riot = require('riot');
var firebase = require('firebase');

module.exports = function() {
    riot.observable(this);

    var self = this;

    var fbRef = new firebase('https://bluebird.firebaseio.com/');

    function getPending(pid) {
        var list = [];

        self.trigger('members', list, 'pending');

        fbRef.child('pending/' + pid).on('child_added', function(snap) {
            fbRef.child('user/' + snap.key()).once('value', function(childSnap) {
                list.push({
                    uid: snap.key(),
                    name: childSnap.val().name
                });

                self.trigger('members', list, 'pending');
            });
        });
    }

    function getActive(pid) {
        var list = [];

        self.trigger('members', list, 'active');

        fbRef.child('member/' + pid).on('child_added', function(snap) {
            fbRef.child('user/' + snap.key()).once('value', function(childSnap) {
                list.push({
                    uid: snap.key(),
                    name: childSnap.val().name
                });

                self.trigger('members', list, 'active');
            });
        });
    }

    self.on('list_members_pending', getPending);
    self.on('list_members_pending', getActive);
};
