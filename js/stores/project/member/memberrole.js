var riot = require('riot');
var promise = require('promise');
var fbRef = require('../../../firebase');

module.exports = function() {
    riot.observable(this);

    var self = this;

    function edit(data) {
        console.log('edit member', data);

        var memberRef = fbRef.child('membership/' + data.pid + '/member/' + data.uid);
        var ringerRef = fbRef.child('ringer/' + data.pid + '/' + data.uid);

        // Get signature list as promise.
        var ringers = new promise(function(resolve, reject) {
            var list = [];
            fbRef.child('ringer/' + data.pid).once('value', function(snap) {
                snap.forEach(function(childSnap) {
                    list.push(childSnap.val());
                });
                resolve({list: list, source: snap.val()});
            });
        });

        // 
        if (data.newRole == 'ringer') {
            promoteOrUpdate();
        } else if (data.newRole != data.role) {
            demote();
        }

        function promoteOrUpdate() {
            ringers.then(function(res) {
                // Check if newSign is used by another member.
                var index = res.list.indexOf(data.newSign);
                if (index != -1 && res.source[data.uid] != data.newSign) {
                    var msg = 'The signature "' + data.newSign + '" is assigned to another member.';
                    self.trigger('alert', msg, 'warning');
                    return;
                }

                if (data.newRole != data.role) {
                    promote();
                } else if (data.newSign != data.sign) {
                    update();
                }
            });
        }

        function promote() {
            console.log('promote');
            memberRef.update({role: data.newRole, sign: data.newSign});
            ringerRef.set(data.newSign);
        }

        function update() {
            console.log('update');
            memberRef.update({sign: data.newSign});
            ringerRef.set(data.newSign);
        }

        function demote() {
            console.log('demote');
            memberRef.update({role: data.newRole, sign: null});
            // Keep list of signatures.
        }
    }

    self.on('memberrole_edit', edit);
};
