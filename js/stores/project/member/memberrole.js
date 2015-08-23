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

    // function editRole(data) {
    //     var memberSnap = fbRef.child('member_status/' + data.pid + '/member/' + data.uid);
    //     var ringerSnap = fbRef.child('ringer/' + data.pid + '/' + data.uid);

    //     // Wrap list of ringer signatures in a promise.
    //     var ringers = new promise(function(resolve, reject) {
    //         fbRef.child('ringer/' + data.pid).once('value', function(snap) {
    //             var signatures = [];
    //             snap.forEach(function(childSnap) {
    //                 signatures.push(childSnap.val());
    //             });
    //             resolve({list: signatures, source: snap.val()});
    //         });
    //     });

    //     // Define action to take depending on 'data'.
    //     if (data.newRole == 'ringer') {
    //         ringers.then(function(res) {
                
    //             var index = res.list.indexOf(data.newSign);

    //             // Check if newSign is used by another member.
    //             if (index != -1 && res.source[data.uid] != data.newSign) {
    //                 var message = 'The signature "' + data.newSign + '" is assigned to another member.';
    //                 self.trigger('alert', message, 'error');
    //                 return;
    //             }

    //             if (data.newRole != data.role) {
    //                 // Promote to ringer.
    //                 promote();
    //             } else {
    //                 if (data.newSign != data.sign) {
    //                     // Update ringer.
    //                     update();
    //                 }
    //             }
    //         });
    //     } else {
    //         if (data.newRole != data.role) {
    //             // Demote to assistant.
    //             demote();
    //         }
    //     }

    //     function promote() {
    //         memberSnap.update({role: data.newRole, sign: data.newSign});
    //         ringerSnap.set(data.newSign);
    //     }

    //     function update() {
    //         memberSnap.update({sign: data.newSign});
    //         ringerSnap.set(data.newSign);
    //     }

    //     function demote() {
    //         memberSnap.update({role: data.newRole, sign: null});
    //         /**
    //          * Never completely remove ringer signatures (only in member).
    //          * ringerSnap.remove();
    //          */
    //     }
    // }

    // self.on('memberrole_edit', editRole);
};
