var riot = require('riot');
var fbRef = require('../../firebase');

module.exports = function() {
	riot.observable(this);

	var self = this;

	var createProject = function(data) {
		var uid = fbRef.getAuth().uid;
		var country = data.country;

		// Firebase locations.
		var projectRef = fbRef.child('project');
		var countryRef = fbRef.child('country/' + country.iso);
		var userNameRef = fbRef.child('user/' + uid + '/name');
		var userProjectRef = fbRef.child('userproject/' + uid + '/own');

		// Modify data object.
		data.country = country.iso;
		data.userId = uid;

		// Save project.
		var newProjectRef = projectRef.push(data);
		
		// Get ID of project.
		var projectId = newProjectRef.key();

		// Update project with user name.
		userNameRef.once('value', function(name) {
			projectRef.child(projectId).update({userName: name.val()});
		});

		// Add project data to user project.
		userProjectRef.child(projectId).set({
			title: data.title,
			site: data.site,
			date: data.date
		});

		// Store country ISO.
		countryRef.once('value', function(snap) {
			if (!snap.exists()) {
				countryRef.set({name: country.name});
			}
			// List project by country.
			countryRef.child('project/' + projectId).set(true);
		});

		// Route to project.
		var route = 'project/' + projectId;
		riot.route(route);
	}

	self.on('project_create', createProject);
}
