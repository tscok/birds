var riot = require('riot');
var promise = require('promise');
var fbRef = require('../../../firebase');
var utils = require('../../../utils');

module.exports = function() {
    riot.observable(this);

    var self = this, pid;
    var list = {pending: [], member: []};

    function init(id) {
        pid = id;

        self.trigger('memberlist_clear');

        fbRef.child('membership/' + pid + '/pending').on('value', handle);
        fbRef.child('membership/' + pid + '/member').on('value', handle);
    }

    function handle(snap) {
        var type = snap.key();
        list[type].length = 0;
        snap.forEach(function(user) {
            var data = user.val();
            data.uid = user.key();
            list[type].push(data);
        });

        self.trigger('memberlist_data', type, list[type]);
    }

    function onRoute(route, id, action) {
        // Ignore if not project or action is defined.
        if (route != 'project' || !id || action) {
            return;
        }

        // Load existing data.
        if (pid && pid == id && (list.pending.length || list.member.length)) {
            self.trigger('memberlist_data', 'pending', memberlist.pending);
            self.trigger('memberlist_data', 'member', memberlist.member);
            return;
        }

        // Initialize member data.
        init(id);
    }

    self.on('route', onRoute);
};
