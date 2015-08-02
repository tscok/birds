var riot = require('riot');
var fbRef = require('../../firebase');

module.exports = function() {
    riot.observable(this);

    var self = this;

    function countPending(pid) {
        fbRef.child('member_status/' + pid + '/pending').on('value', function(pending) {
            if (pending.exists()) {
                self.trigger('pending_count_' + pid, pending.numChildren());
            }
        });
    }

    self.on('count_pending', countPending);
};
