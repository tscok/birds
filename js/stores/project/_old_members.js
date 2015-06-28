var riot = require('riot');
var firebase = require('firebase');

module.exports = function() {
    riot.observable(this);

    var self = this, list = {};

    var fbRef = new firebase('https://bluebird.firebaseio.com/');

    function listMembers(pid) {
        list.members = [];
        list.pending = [];

        getMembers(pid);
        getPending(pid);
    }

    function getMembers(pid) {
        fbRef.child('member/' + pid).on('value', function(snap) {
            list.members.length = 0;
            console.log('memberSnap',snap.val());
            self.trigger('members_listed', list);

            snap.forEach(function(childSnap) {
                listUser(childSnap.key(), 'members');
            });
        });
    }

    function getPending(pid) {
        fbRef.child('pending/' + pid).on('value', function(snap) {
            list.pending.length = 0;
            console.log('pendingSnap',snap.val());
            self.trigger('members_listed', list);

            snap.forEach(function(childSnap) {
                listUser(childSnap.key(), 'pending');
            });
        });
    }

    function listUser(uid, type) {
        fbRef.child('user/' + uid).once('value', function(userSnap) {
            var user = userSnap.val();
            list[type].push({
                'uid': uid,
                'name': user.name,
                'member': type === 'members'
            });
            console.log('listUser', list);
            self.trigger('members_listed', list);
        });
    }

    function grantMembership(uid, pid) {
        // Remove uid from pending.
        fbRef.child('pending/' + pid + '/' + uid).remove(function(err) {
            if (!err) {
                // Add uid to member.
                fbRef.child('member/' + pid + '/' + uid).set(true);
            }
        });
    }

    function revokeMembership(uid, pid) {
        // Remove uid from member.
        fbRef.child('member/' + pid + '/' + uid).remove(function(err) {
            if (!err) {
                // Add uid to pending.
                fbRef.child('pending/' + pid + '/' + uid).set(true);
            }
        });

        // TODO: 'Bench' members to pause their membership instead of
        // sending them back to pending which will make them show up
        // anew as pending in owners' profile.
        // fbRef.child('benched/' + pid + '/' + uid).set(true);
    }

    self.on('member_grant', grantMembership);
    self.on('member_revoke', revokeMembership);
    self.on('list_members', listMembers);
};