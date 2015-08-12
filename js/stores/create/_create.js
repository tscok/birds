var riot = require('riot');
var utils = require('../../utils');
var fbRef = require('../../firebase');

module.exports = function() {
	riot.observable(this);

	var self = this;

	var createProject = function(data) {
		var uid = fbRef.getAuth().uid;

		// Firebase locations.
		var projectRef = fbRef.child('project');
		var countryRef = fbRef.child('country/' + data['countryIso']);
		var userRef = fbRef.child('user_project/' + uid + '/own/');

		// Save project.
		var newProjectRef = projectRef.push({
			'public': data['status'] === 'public',
			'ownerId': uid,
			'ownerName': utils.getLocalUser('name'),
			'title': data['title'],
			'site': data['site'],
			'latlng': data['latlng'],
			'country': data['countryIso'],
			'dateStart': data['dateStart'],
			'dateEnd': data['dateEnd']
		});
		
		// Get ID of saved project.
		var projectId = newProjectRef.key();

		// Add projectId to user profile.
		userRef.child(projectId).set(true);
		
		countryRef.once('value', function(snap) {
			// Store Country (if countryIso doesn't exist).
			if (!snap.exists()) {
				countryRef.set({full: data.countryName});
			}
			// List project under Country.
			countryRef.child('project/' + projectId).set(true);
		});

		var route = 'profile'; // 'project/' + projectId
		riot.route(route);
	}

	self.on('project_create', createProject);
}
