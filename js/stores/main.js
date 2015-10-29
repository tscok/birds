var riot = require('riot');

module.exports = function() {
	riot.observable(this);

	var self = this;

	self.on('route', function(route, id, action) {
        // Affects main.tag
		self.trigger('main', route, id, action);
        // Affects login.tag
        self.trigger('main_' + route, id, action);


        // -- This is now done in app-router.js --
        // 
        // if (route == 'project') {
        //     self.trigger('membership_check', id);
        // }
	});
};
