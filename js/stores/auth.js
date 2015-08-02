var riot = require('riot');
var utils = require('../utils');
var fbRef = require('../firebase');
var promise = require('promise');

module.exports = function() {
	riot.observable(this);

	var self = this;

	function authWithPassword(userData) {
		return new promise(function(resolve, reject) {
			fbRef.authWithPassword(userData, function onAuth(err, user) {
				if(err) reject(err);
				if(user) resolve(user);
			});
		});
	};

	function handleAuthResponse(promise, route) {
		promise.then(function(authData) {
			lastLogin = new Date();
			setLocalUserData(authData);
			self.trigger('alert_clear');
			self.trigger('login_success')
			riot.route(route);
		}, function(error) {
			self.trigger('alert', error.message, 'error');
			self.trigger('login_fail');
		});
	};

	function setLocalUserData(authData) {
		var localUser = utils.getLocalUser();
		var authEmail = (authData.provider == 'password') ? authData.password.email : '';
		if (localUser.email && localUser.email !== authEmail) {
			utils.setLocalUser({email: authEmail, name: ''});
		}
	}

	function login(userData) {
		var promise = authWithPassword(userData);
		handleAuthResponse(promise, 'profile');
	}

	function logout() {
		fbRef.unauth();
		self.trigger('alert_clear');
		self.trigger('auth', null);
		riot.route('login');
	}

	function authCheck(args) {
		var uid = fbRef.getAuth() ? fbRef.getAuth().uid : null;
		self.trigger('auth', uid);
	}
	
	self.on('auth_check', authCheck);
	self.on('login', login);
	self.on('logout', logout);
}
