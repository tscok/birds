var riot = require('riot');
var firebase = require('firebase');

module.exports = function() {
    riot.observable(this);

    var self = this;

    var fbRef = new firebase('https://bluebird.firebaseio.com/');

    function countPending(pid) {
        fbRef.child('member_status/' + pid + '/pending/').once('value', function(snap) {
            if (snap.val() !== null) {
                self.trigger('pending_count_' + pid, snap.numChildren());
            }
        });
    }

    self.on('count_pending', countPending);
};