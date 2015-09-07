var riot = require('riot');
var promise = require('promise');
var fbRef = require('../../../firebase');

module.exports = function() {
    riot.observable(this);

    var self = this, memberRef, ringerRef;

    var onComplete = function(err) {
        if (err) {
            self.trigger('alert', err.message, 'error');
        } else {
            self.trigger('memberrole_hide');
        }
    };

    function isSignUsed(data) {
        return new promise(function(resolve, reject) {
            ringerRef.once('value', function(snap) {
                var user;

                // Check for ringers who has the signature.
                snap.forEach(function(childSnap) {
                    if (childSnap.val().sign == data.newSign) {
                        user = childSnap.key();
                        return true;
                    }
                });

                // Check if holder/claimer is the same user.
                if (user && user != data.uid) {
                    self.trigger('alert', '"'+data.newSign+'" is assigned to another member.', 'error');
                    resolve(true);
                }

                resolve(false);
            });
        });
    }

    function promote(data) {
        isSignUsed(data).then(function(isUsed) {
            if (isUsed) {
                return;
            }
            memberRef.child(data.uid).update({role: data.newRole, sign: data.newSign}, onComplete);
            ringerRef.child(data.uid).update({role: data.newRole, sign: data.newSign, active: true}, onComplete);
        });
    }

    function update(data) {
        isSignUsed(data).then(function(isUsed) {
            if (isUsed) {
                return;
            }
            memberRef.child(data.uid).update({sign: data.newSign}, onComplete);
            ringerRef.child(data.uid).update({sign: data.newSign}, onComplete);
        });
    }

    function demote(data) {
        console.log(data);
        memberRef.child(data.uid).update({role: data.newRole}, onComplete);
        ringerRef.child(data.uid).update({role: data.newRole, active: false}, onComplete);
    }

    self.on('memberrole_promote', promote);
    self.on('memberrole_update', update);
    self.on('memberrole_demote', demote);

    // Setup firebase ref on route.
    self.on('route', function(route, id, action) {
        if (route == 'project' && !action && !memberRef && !ringerRef) {
            memberRef = fbRef.child('membership/' + id + '/member');
            ringerRef = fbRef.child('ringer/' + id);
        }
    });
};
