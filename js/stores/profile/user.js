var riot = require('riot');
var fbRef = require('../../firebase');

module.exports = function() {
	riot.observable(this);

	var self = this, uid, userRef;

    // var onComplete = function(err) {
    //     if (!err) {
    //         self.trigger('alert', 'Profile saved!', 'success');
    //     } else {
    //         self.trigger('alert', err.message, 'warning');
    //     }
    // }

    // fbRef.onAuth(function(authData) {
    //     if (authData) {
    //         userRef = fbRef.child('user/' + authData.uid);
    //         var userData = {};
    //         userRef.on('value', function(snap) {
    //             if (snap.exists()) {
    //                 userData = snap.val();
    //             }
    //         });
    //         self.trigger('user_data', userData);
    //     }
    // });

    // function edit(data) {
    //     userRef.update(data, onComplete);
    // }

    // self.on('user_edit', edit);
}