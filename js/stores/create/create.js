var riot = require('riot');
var fbRef = require('../../firebase');

module.exports = function() {
	riot.observable(this);

	var self = this;

	var onComplete = function(err) {
        if (err) {
            self.trigger('alert', err.message, 'warning');
        }
    };

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
		var newProjectRef = projectRef.push(data, onComplete);
		
		// Get ID of project.
		var projectId = newProjectRef.key();
		var memberRef = fbRef.child('membership/' + projectId + '/member');
		
		// Update project with user name.
		userNameRef.once('value', function(name) {
			var myName = name.val();
			projectRef.child(projectId).update({userName: myName}, onComplete);

			// Add myself as member/owner of project.
	        memberRef.child(uid).set({name: myName, role: 'owner'}, onComplete);
		});

		// Add project data to user project.
		userProjectRef.child(projectId).set({
			title: data.title,
			site: data.site,
			date: data.date
		}, onComplete);

		// Store country ISO.
		countryRef.once('value', function(snap) {
			if (!snap.exists()) {
				countryRef.set({name: country.name}, onComplete);
			}
			// List project by country.
			countryRef.child('project/' + projectId).set(true, onComplete);
		});

		// Route to project.
		var route = 'project/' + projectId;
		riot.route(route);
	}

	self.on('create_project', createProject);
	self.on('route', function(route) {
		if (route == 'create') {
			self.trigger('create_reset');
			self.trigger('map_reset');
		}
	});
};
