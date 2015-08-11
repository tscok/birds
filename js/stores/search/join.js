var riot = require('riot');
var fbRef = require('../../firebase');

module.exports = function() {
    riot.observable(this);

    var self = this;
    var types = ['pending','member'];

    function status(pid) {
        var uid = fbRef.getAuth().uid;

        var handle = function(type, snap) {
            self.trigger('join_' + pid, type, snap.exists());
        }
        
        for (var i = 0; i < types.length; i++) {
            fbRef.child('user_project/' + uid + '/' + types[i] + '/' + pid).on('value', function(snap) {
                handle(types[i], snap);
            });
        };
    }

    self.on('join_get_status', status)
};
