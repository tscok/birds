var riot = require('riot');
var firebase = require('firebase');

module.exports = function() {
    riot.observable(this);

    var self = this;

    var fbRef = new firebase('https://bluebird.firebaseio.com/');

    function countPending(pid) {
        fbRef.child('pending/' + pid).once('value', function(snap) {
            var count = snap.numChildren();
            self.trigger('pending_count_' + pid, count);
        });
    }

    self.on('count_pending', countPending);
};