var riot = require('riot');
var firebase = require('firebase');

module.exports = function() {
    riot.observable(this);

    var self = this;

    var fbRef = new firebase('https://bluebird.firebaseio.com/');

    function refuse(data) {
        // Remove uid from pending.
        fbRef.child('member/' + data.pid + '/pending/' + data.uid).remove(function(err) {
            if (err) {
                self.trigger('alert', {text: err.message});
                return;
            }
            self.trigger('membership_update');
        })
    }

    function grant(data, type) {
        // Move uid from [type] to granted.
        fbRef.child('member/' + data.pid + '/' + type + '/' + data.uid).remove(function(err) {
            if (err) {
                self.trigger('alert', {text: err.message});
                return;
            }
            console.log('uid removed from pending…');
            fbRef.child('member/' + data.pid + '/granted/' + data.uid).set(true, function(err) {
                if (err) {
                    self.trigger('alert', {text: err.message});
                    return;
                }
                console.log('uid added to granted!');
                self.trigger('membership_update');
            });
        });
    }

    function standby(data, type) {
        // Move uid from pending to standby.
        fbRef.child('member/' + data.pid + '/' + type + '/' + data.uid).remove(function(err) {
            if (err) {
                self.trigger('alert', {text: err.message});
                return;
            }
            fbRef.child('member/' + data.pid + '/standby/' + data.uid).set(true, function(err) {
                if (err) {
                    self.trigger('alert', {text: err.message});
                    return;
                }
                self.trigger('membership_update');
            });
        })
    }

    function revoke(data, type) {
        // Remove uid from [type].
        fbRef.child('member/' + data.pid + '/' + type + '/' + data.uid).remove(function(err) {
            if (err) {
                self.trigger('alert', {text: err.message});
                return;
            }
            self.trigger('membership_update');
        });
    }

    self.on('membership_granted', grant);
    self.on('membership_refused', refuse);
    self.on('membership_standby', standby);
    self.on('membership_revoked', revoke);
};
