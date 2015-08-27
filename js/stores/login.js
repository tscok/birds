var riot = require('riot');
var fbRef = require('../firebase');
var promise = require('promise');

module.exports = function() {
	riot.observable(this);

	var self = this;

	// Login using facebook, twitter, etc.
	function thirdPartyLogin(provider) {
		return new promise(function(resolve, reject) {
			fbRef.authWithOAuthPopup(provider, function onAuth(err, user) {
				if (err) { reject(err); }
				if (user) { resolve(user); }
			});
		});
	}

	// Login using username/password.
	function passwordLogin(userData) {
		return new promise(function(resolve, reject) {
			fbRef.authWithPassword(userData, function onAuth(err, user) {
				if (err) { reject(err); }
				if (user) { resolve(user); }
			})
		});
	}

	function handleAuthResponse(promise, route) {
		promise.then(function(authData) {
			console.log('login', authData);
			self.trigger('login_success');
			riot.route(route);
		}, function(error) {
			self.trigger('login_fail');
			self.trigger('alert', error.message, 'warning');
		})
	}

	function socialLogin(provider) {
		var loginPromise = thirdPartyLogin(provider);
		handleAuthResponse(loginPromise, 'profile');
	}

	function login(userData) {
		var loginPromise = passwordLogin(userData);
		handleAuthResponse(loginPromise, 'profile');
	}

	function logout() {
		fbRef.unauth();
		riot.route('login');
	}

	function logoutOnRoute(route) {
		if (route == 'login' && fbRef.getAuth()) {
			fbRef.unauth();
		}
	}

	self.on('login', login);
	self.on('social_login', socialLogin);
	self.on('logout', logout);
	self.on('route', logoutOnRoute);
}
