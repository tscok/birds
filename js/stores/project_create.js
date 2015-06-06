var riot = require('riot');
var utils = require('../utils');
var firebase = require('firebase');

module.exports = function() {
	riot.observable(this);

	var self = this;

	var fbRef = new firebase('https://bluebird.firebaseio.com/');

	var createProject = function(data) {
		var uid = fbRef.getAuth().uid;

		// Firebase locations.
		var projectRef = fbRef.child('project');
		var countryRef = fbRef.child('country/' + data['countryIso']);
		var userRef = fbRef.child('user/' + uid);

		// Save project.
		var newProjectRef = projectRef.push({
			"public": data['status'] === 'public',
			"ownerId": uid,
			"ownerName": utils.getLocalUser('name'),
			"title": data['title'],
			"site": data['site'],
			"latlng": data['latlng'],
			"country": data['countryIso'],
			"dateStart": data['dateStart'],
			"dateEnd": data['dateEnd']
		});
		
		// Get ID of saved project.
		var projectID = newProjectRef.key();

		// Add projectID to user profile.
		userRef.child('project/own/' + projectID).set(true);
		
		// Store Country data (if countryIso does not already exist).
		countryRef.once('value', function(snap) {
			if (snap.val() === null) {
				countryRef.set({full: data.countryName});
			}
			// List project under Country.
			countryRef.child('project/' + projectID).set(true);
		});

		var route = 'profile';
		// var route = 'project/'+ projectID;
		riot.route(route);
	}

	self.on('project_create', createProject);
}