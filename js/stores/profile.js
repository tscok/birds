var riot = require('riot');
var utils = require('../utils');
var firebase = require('firebase');

module.exports = function() {
	riot.observable(this);

	var self = this, user, uid;

	var fbRef = new firebase('https://bluebird.firebaseio.com/');

	// Get the user object (triggered on route).
	function userUpdate() {
		var auth = fbRef.getAuth();
		var localUser = utils.getLocalUser();

		uid = auth.uid;

		// Run once and again if user name changes.
		fbRef.child('user/' + uid + '/name').on('value', function(snap) {
			var name = snap.val();
			if (name !== null && name !== localUser['name']) {
				utils.updateLocalUser('name', name);
				self.trigger('user_updated', utils.getLocalUser());
			}
		});

		self.trigger('user_updated', localUser);
	}

	// Alerts on success or failure.
	function updateComplete(error) {
		if(error) {
			self.trigger('alert', {text: error.message, type:'danger'});
		}else{
			self.trigger('alert', {text: 'Profile successfully updated!', type:'success'});
		}
	}

	// Triggered on route.
	self.on('user_update', userUpdate);

	// Triggerd by actions.
	self.on('user_update_name', function(params) {
		fbRef.child('user/' + uid).update(params, updateComplete);
	});

	self.on('user_update_email', function(params) {
		fbRef.changeEmail(params, updateComplete);
	});

	self.on('user_update_password', function(params) {
		fbRef.changePassword(params, updateComplete);
	});
}