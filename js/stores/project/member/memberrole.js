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
        console.log('compare to', data.newSign);
        var user;
        ringerRef.once('value', function(snap) {
            console.log(snap.val());
            // snap.forEach(function(childSnap) {
            //     console.log(childSnap.val().sign);
            //     if (childSnap.val().sign == data.newSign) {
            //         user = childSnap.key();
            //     }
            // });
        });

        if (user && user != data.uid) {
            var message = '"' + data.newSign + '" is already used.';
            self.trigger('alert', message, 'warning');
            return true;
        }
        console.log('all good');
        self.trigger('alert_clear');
        return false;
    }

    function promote(data) {
        // Check data.newSign.
        if (isSignUsed(data)) {
            return;
        }
        // Promote member.
        // memberRef.child(data.uid).update({role: data.newRole, sign: data.newSign}, onComplete);
        // ringerRef.child(data.uid).update({role: data.newRole, sign: data.newSign}, onComplete);
    }

    function update(data) {
        // Check data.newSign.
        if (isSignUsed(data)) {
            return;
        }
        // Update member.
        // memberRef.child(data.uid).update({sign: data.newSign}, onComplete);
        // ringerRef.child(data.uid).update({sign: data.newSign}, onComplete);
    }

    function demote(data) {
        // memberRef.child(data.uid).update({role: data.newRole}, onComplete);
    }


    self.on('memberrole_promote', promote);
    self.on('memberrole_update', update);
    self.on('memberrole_demote', demote);

    // Setup firebase ref on route.
    self.on('route', function(route, id, action) {
        if (route == 'project' && !action && !memberRef) {
            memberRef = fbRef.child('membership/' + id + '/member');
            ringerRef = fbRef.child('ringer/' + id);
        }
    });
};
