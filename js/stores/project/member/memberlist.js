var riot = require('riot');
var promise = require('promise');
var fbRef = require('../../../firebase');
var utils = require('../../../utils');

module.exports = function() {
    riot.observable(this);

    var self = this;
    var lists = {};
    var types = ['member','pending'];
    var lastId = '';

    function init(route, id, action) {
        if (route != 'project' || !!action) {
            return;
        }

        // On change of project or reload.
        if (lastId != id) {
            for (var i = 0; i < types.length; i++) {
                // Clear lists in view.
                self.trigger('memberlist_clear', types[i]);
                // Add firebase listeners.
                fbRef.child('member_status/' + id + '/' + types[i]).on('value', handle);
            };
            lastId = id;
        }
    }

    function handle(snap) {
        var type = snap.key();
        var count = snap.numChildren();

        lists[type] = [];

        if (!snap.exists()) {
            // trigger list type (empty array).
            self.trigger('memberlist_data', type, lists[type]);
        }

        snap.forEach(function(childSnap) {
            var memberInfo = utils.extend(childSnap.val(), {uid: childSnap.key()});
            var namePromise = getMemberName(childSnap);
            listMemberData(namePromise, memberInfo, type, count);
        });
    }

    function getMemberName(snap) {
        return new promise(function(resolve, reject) {
            fbRef.child('user/' + snap.key() + '/name').on('value', function(name) {
                if (name.exists()) { resolve(name); }
            });
        });
    }

    function listMemberData(promise, info, type, count) {
        promise.then(function(data) {
            info['name'] = data.val();
            lists[type].push(info);

            if (count == lists[type].length) {
                // trigger list type
                self.trigger('memberlist_data', type, lists[type]);
            }
        });
    }



    self.on('route', init);

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
