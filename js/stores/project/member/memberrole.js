var riot = require('riot');
var promise = require('promise');
var fbRef = require('../../../firebase');

module.exports = function() {
    riot.observable(this);

    var self = this, ringerRef, memberRef;

    function edit(data) {
        ringerRef = fbRef.child('ringer/' + data.pid);
        memberRef = fbRef.child('membership/' + data.pid + '/member');

        var roleChanged = data.newRole != data.role;
        var signChanged = data.newSign ? (data.newSign != data.sign) : false;

        // No changes.
        if (!roleChanged && !signChanged) {
            self.trigger('memberrole_hide');
            return;
        }

        if (data.newSign) {
            isSignTaken(data).then(function(isTaken) {
                if (isTaken) {
                    self.trigger('alert', '"'+ data.newSign +'" is assigned to another member!', 'warning');
                    return;
                }

                // Promote to ringer.
                if (roleChanged && (data.newRole == 'ringer' || data.newRole == 'owner')) {
                    var memberData = {role: data.newRole, sign: data.newSign};
                    var ringerData = {sign: data.newSign, active: true};
                    editMember(data.uid, memberData, ringerData);
                }

                // Update ringer.
                if (!roleChanged && signChanged) {
                    var memberData = {sign: data.newSign};
                    var ringerData = {sign: data.newSign};
                    editMember(data.uid, memberData, ringerData);
                }
            });
        }

        // Demote to assistant.
        if (roleChanged && data.newRole == 'assistant') {
            var memberData = {role: data.newRole};
            var ringerData = {active: false};
            editMember(data.uid, memberData, ringerData);
        }
    }

    function editMember(uid, memberData, ringerData) {
        memberRef.child(uid).update(memberData, onComplete);
        ringerRef.child(uid).update(ringerData, onComplete);
    }

    function onComplete(err) {
        if (err) {
            self.trigger('alert', err.message, 'error');
        } else {
            self.trigger('alert', 'Member updated!', 'success');
            self.trigger('memberrole_hide');
        }
    }

    function isSignTaken(data) {
        return new promise(function(resolve, reject) {
            ringerRef.orderByChild('sign').equalTo(data.newSign)
            .once('value', function(snap) {
                var takenByUid;
                if (snap.exists()) {
                    snap.forEach(function(childSnap) {
                        takenByUid = childSnap.key();
                    });
                    if (takenByUid && takenByUid != data.uid) {
                        resolve(true);
                    }
                }
                resolve(false);
            });
        });
    }

    self.on('memberrole_edit', edit);
};
