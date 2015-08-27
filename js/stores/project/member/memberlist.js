var riot = require('riot');
var promise = require('promise');
var fbRef = require('../../../firebase');
var utils = require('../../../utils');

module.exports = function() {
    riot.observable(this);

    var self = this;
    var lists = {};

    function init(projectId) {
        var pid = projectId;
        self.trigger('memberlist_clear');
        fbRef.child('membership/' + pid + '/pending').on('value', handle);
        fbRef.child('membership/' + pid + '/member').on('value', handle);
    }

    function handle(snap) {
        var type = snap.ref().key();
        var count = snap.numChildren();

        lists[type] = [];

        if (!snap.exists()) {
            self.trigger('memberlist_data', type, []);
            return;
        }

        snap.forEach(function(childSnap) {
            var userInfo = {uid: childSnap.key()};
            var namePromise = getMemberName(childSnap);
            
            if (childSnap.val() instanceof Object) {
                userInfo = utils.extend(childSnap.val(), userInfo)
            }
            
            listMemberData(namePromise, userInfo, type, count);
        });
    }

    function getMemberName(snap) {
        return new promise(function(resolve, reject) {
            fbRef.child('user/' + snap.key() + '/name').on('value', function(name) {
                if (name.exists()) { resolve(name.val()); }
            });
        });
    }

    function listMemberData(namePromise, userInfo, type, count) {
        namePromise.then(function(data) {
            userInfo.name = data;
            lists[type].push(userInfo);

            if (count == lists[type].length) {
                self.trigger('memberlist_data', type, lists[type]);
            }
        });
    }

    function onRoute(route, id, action) {
        if (route != 'project' || !!action) {
            return;
        }
        init(id);
    }

    self.on('route', onRoute);
};
