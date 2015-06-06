var riot = require('riot');
var utils = require('../utils');
var promise = require('promise');
var firebase = require('firebase');

module.exports = function() {
	riot.observable(this);

	var self = this;
	var fbRef = new firebase('https://bluebird.firebaseio.com/');
	var userRef = fbRef.child('user');

	function authWithPassword(userObj) {
		return new promise(function(resolve, reject) {
			fbRef.authWithPassword(userObj, function onAuth(err, user) {
				if(err) reject(err);
				if(user) resolve(user);
			});
		});
	};

	function handleAuthResponse(promise, route) {
		promise.then(function(auth) {
			setLocalUserData(auth);
			self.trigger('alert', null);
			riot.route(route);
		}, function(error) {
			self.trigger('alert', {text:error.message, type:'danger'});
		});
	};

	function setLocalUserData(auth) {
		console.log('Auth provider:', auth.provider);
		
		var localUser = utils.getLocalUser();
		var authEmail = auth.provider == 'password' ? auth.password.email : '';

		if (localUser.email && localUser.email !== authEmail) {
			utils.setLocalUser({email: authEmail, name: ''});
		}
	}
	
	self.on('auth', function() {
		var uid = fbRef.getAuth() ? fbRef.getAuth().uid : null;
		self.trigger('auth_update', uid);
	});

	self.on('login', function(userObj) {
		var promise = authWithPassword(userObj);
		handleAuthResponse(promise, 'profile');
	});

	self.on('logout', function(route) {
		console.log('user:', fbRef.getAuth(), 'last logged in:', new Date());
		fbRef.unauth();
		self.trigger('alert', null);
		self.trigger('auth_update', null);
		riot.route(route ? route : 'login');
	});

	self.on('register', function(userObj, userName) {
		console.log(userObj, userName);
	});
}