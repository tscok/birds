var riot = require('riot');

module.exports = function() {
	riot.observable(this);

	var self = this;

    // proxy for routing
	self.on('route', function(route, id, action) {
		self.trigger('route_changed', route, id, action);
        self.trigger('route_' + route, id, action);
	});
};