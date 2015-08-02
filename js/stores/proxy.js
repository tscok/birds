var riot = require('riot');

module.exports = function() {
	riot.observable(this);

	var self = this;

    // proxy for routing
	self.on('proxy_route', function(route, id, action) {
		self.trigger('route', route, id, action);
        self.trigger('route_' + route, id, action);
	});
};