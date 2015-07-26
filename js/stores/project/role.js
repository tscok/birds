var riot = require('riot');
var promise = require('promise');
var firebase = require('firebase');

module.exports = function() {
    riot.observable(this);

    var self = this;

    var fbRef = new firebase('https://bluebird.firebaseio.com/');

    function updateMember(data) {

        var memberSnap = fbRef.child('member_status/' + data.pid + '/member/' + data.uid);
        var ringerSnap = fbRef.child('ringer/' + data.pid + '/' + data.uid);

        var signatures = [];

        var ringers = new promise(function(resolve, reject) {
            fbRef.child('ringer/' + data.pid).once('value', function(snap) {
                if (snap) resolve(snap);
            });
        });

        function isSignTaken(sign) {
            if (!signatures.length) {
                ringers.then(function(result) {
                    result.forEach(function(childSnap) {
                        signatures.push(childSnap.val());
                    });
                });
            }
            return signatures.indexOf(sign) != -1;
        }

        /* PROMOTE TO RINGER */
        if (data.newRole == 'ringer' && data.newRole != data.role) {
            promote();
        }

        /* UPDATE RINGER (SIGN.) */
        if (data.newRole == 'ringer' && data.newRole == data.role && data.newSign != data.sign) {
            update();
        }

        /* DEMOTE TO ASSISTANT */
        if (data.newRole == 'assistant' && data.newRole != data.role) {
            demote();
        }

        function promote() {
            if (isSignTaken(data.newSign)) {
                self.trigger('alert', {text:'The signature "'+ data.newSign +'" already exists in this project.', type:'error'});
                return;
            }
            memberSnap.update({role: data.newRole, sign: data.newSign});
            ringerSnap.set(data.newSign);
        }

        function update() {
            if (isSignTaken(data.newSign)) {
                self.trigger('alert', {text:'The signature "'+ data.newSign +'" already exists in this project.', type:'error'});
                return;
            }
            memberSnap.update({sign: data.newSign});
            ringerSnap.set(data.newSign);
        }

        function demote() {
            memberSnap.update({role: data.newRole, sign: null});
            /**
             * Never completely remove ringer info as this could lead
             * to 'who did what' problems down the line.
             * ringerSnap.remove();
             */
        }
    }

    self.on('role_update', updateMember);
};
