var riot = require('riot');
var promise = require('promise');
var fbRef = require('../../../firebase');
var utils = require('../../../utils');

module.exports = function() {
    riot.observable(this);

    var self = this, pendingRef, memberRef;
    var lists = {};

    function init(pid) {
        fbRef.child('membership/' + pid + '/pending').on('value', handle);
        fbRef.child('membership/' + pid + '/member').on('value', handle);
    }

    function handle(snap) {
        var type = snap.ref().key();
        var count = snap.numChildren();

        // console.log(type, count);

        lists[type] = [];

        if (!snap.exists()) {
            self.trigger('memberlist_data', type, []);
            return;
        }

        snap.forEach(function(childSnap) {
            var userInfo = {uid: childSnap.key()};
            var namePromise = getMemberName(childSnap);

            // Combine member object with uid.
            if (childSnap.val() instanceof Object) {
                userInfo = utils.extend(childSnap.val(), userInfo)
            }

            listMemberData(namePromise, userInfo, type, count);
        });
    }

    function getMemberName(snap) {
        return new promise(function(resolve, reject) {
            fbRef.child('user/' + snap.key() + '/name').on('value', function(name) {
                resolve(name.exists() ? name.val() : 'John Doe');
            });
        });
    }

    function listMemberData(namePromise, userInfo, type, count) {
        namePromise.then(function(data) {
            userInfo.name = data;
            lists[type].push(userInfo);

            if (count == lists[type].length) {
                // console.log(lists[type]);
                self.trigger('memberlist_data', type, lists[type]);
            }
        });
    }


    self.on('route', function(route, id, action) {
        if (route != 'project' || !!action) {
            return;
        }
        init(id);
    });
};
