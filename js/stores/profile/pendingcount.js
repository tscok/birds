// var riot = require('riot');
// var fbRef = require('../../firebase');

module.exports = function() {
    riot.observable(this);

    var self = this;

    function init(pid) {
        fbRef.child('membership/' + pid + '/pending').on('value', function(pending) {
            if (pending.exists()) {
                self.trigger('pendingcount_' + pid, pending.numChildren());
            }
        });
    }

    self.on('pendingcount_init', init);
};
