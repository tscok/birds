var riot = require('riot');
var promise = require('promise');
var fbRef = require('../../../firebase');
var utils = require('../../../utils');

module.exports = function() {
    riot.observable(this);

    var self = this, pid;
    var memberlist = {pending: [], member: []};

    function init(id) {
        pid = id;

        self.trigger('memberlist_clear');

        fbRef.child('membership/' + pid + '/pending').on('value', handle);
        fbRef.child('membership/' + pid + '/member').on('value', handle);
    }

    function handle(snap) {
        var type = snap.key();
        memberlist[type].length = 0;
        snap.forEach(function(user) {
            var data = user.val();
            data.uid = user.key();
            memberlist[type].push(data);
        });

        self.trigger('memberlist_data', type, memberlist[type]);
    }

    /*function onRoute(route, id, action) {
        if (route != 'project' || !id || !!action) {
            // Not project overview.
            return;
        }

        if (pid == id && (memberlist.pending.length || memberlist.member.length)) {
            // Project did not change.
            self.trigger('memberlist_data', 'pending', memberlist.pending);
            self.trigger('memberlist_data', 'member', memberlist.member);
            return;
        }

        // Initialize member data.
        init(id);
    }

    self.on('route', onRoute);*/
};
