var riot = require('riot');

module.exports = function() {
	riot.observable(this);

	var self = this;

	self.on('route', function(route, id, action) {
		self.trigger('main', route, id, action);
        self.trigger('main_' + route, id, action);

        if (route == 'project') {
            self.trigger('membership_check', id);
        }
	});
};
