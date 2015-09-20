var riot = require('riot');
var promise = require('promise');
var fbRef = require('../../../firebase');
var utils = require('../../../utils');

module.exports = function() {
    riot.observable(this);

    var self = this, projectId;
    var memberlist = {pending: [], member: []};

    fbRef.onAuth(function(authData) {
        if (!authData) {
            self.trigger('memberlist_clear');
        }
    });

    function init(route, id, action) {
        if (route != 'project' && !id) {
            return;
        }

        // Close memberrole form(s).
        self.trigger('memberrole_hide');

        // Still viewing the same project.
        if (projectId == id) {
            self.trigger('memberlist_data', 'pending', memberlist.pending);
            self.trigger('memberlist_data', 'member', memberlist.member);
            return;
        }

        fbRef.child('membership/' + id + '/pending').on('value', handle);
        fbRef.child('membership/' + id + '/member').on('value', handle);

        // Save current id.
        projectId = id;
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

    self.on('route', init);
};
