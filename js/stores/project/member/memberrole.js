var riot = require('riot');
var promise = require('promise');
var fbRef = require('../../../firebase');

module.exports = function() {
    riot.observable(this);

    var self = this;

    function edit(data) {
        var memberRef = fbRef.child('membership/' + data.pid + '/member');

        // Get signature list as promise.
        var ringerList = new promise(function(resolve, reject) {
            var ringers = {}, signatures = [];
            memberRef.once('value', function(snap) {
                snap.forEach(function(childSnap) {
                    if (childSnap.val().role == 'ringer') {
                        ringers[childSnap.key()] = childSnap.val();
                        signatures.push(childSnap.val().sign);
                    }
                });
                resolve({
                    ringers: ringers,
                    signatures: signatures
                });
            });
        });
        
        if (data.newRole == 'ringer') {
            promoteOrUpdate();
        } else if (data.newRole != data.role) {
            demote();
        }

        function promoteOrUpdate() {
            ringerList.then(function(res) {
                var index = res.signatures.indexOf(data.newSign);
                if (index != -1 && res.ringers[data.uid].sign != data.newSign) {
                    self.trigger('alert', 'Signature "'+ data.newSign +'" already in use.', 'warning');
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
            memberRef.child(data.uid).update({role: data.newRole, sign: data.newSign});
        }

        function update() {
            memberRef.child(data.uid).update({sign: data.newSign});
        }

        function demote() {
            memberRef.child(data.uid).update({role: data.newRole});
        }
    }

    self.on('memberrole_edit', edit);
};
