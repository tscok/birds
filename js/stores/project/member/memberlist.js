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

    // function init(id, action) {
    //     // Skip if action (new, old, etc.) is defined.
    //     if (action) {
    //         return;
    //     }

    //     pid = id;

    //     // Get member types.
    //     fbRef.child('member_status/' + pid).on('value', function(snap) {
    //         if (!snap.exists()) {
    //             // No pending, no members. Trigger cancel event for loader…?
    //             self.trigger('memberlist_empty');
    //             return;
    //         }

    //         // Get members by type.
    //         snap.forEach(function(childSnap) {
    //             getMemberByType(childSnap);
    //         });
    //     });
    // }

    // function getMemberByType(snap) {
    //     var list = [];
    //     var type = snap.key();
    //     var count = snap.numChildren();

    //     snap.forEach(function(member) {

    //         fbRef.child('user/' + member.key()).once('value', function(user) {
    //             var userObj = {
    //                 uid: user.key(),
    //                 name: user.val().name,
    //                 pid: pid
    //             };

    //             if (type === 'member') {
    //                 list.push(utils.extend(member.val(), userObj));
    //             } else {
    //                 list.push(userObj);
    //             }

    //             if (count === list.length) {
    //                 self.trigger('memberlist_data', type, list);
    //             }
    //         });
    //     });
    // }

    // riotcontrol.on('route_project', init);
    // self.on('memberlist_init', init);
};
