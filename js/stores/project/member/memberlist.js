var riot = require('riot');
var promise = require('promise');
var fbRef = require('../../../firebase');
var utils = require('../../../utils');

module.exports = function() {
    riot.observable(this);

    var self = this;
    var memberlist = {pending: [], member: []};

    fbRef.onAuth(function(authData) {
        if (!authData) {
            self.trigger('memberlist_clear');
        }
    });

    function init(pid) {
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

    self.on('route', function(route, id, action) {
        if (route == 'project' && id && !action) {
            init(id);
        }
    });
};
