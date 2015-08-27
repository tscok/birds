var riot = require('riot');
var fbRef = require('../../../firebase');

module.exports = function() {
    riot.observable(this);

    var self = this, ringsizeRef;

    function onRoute(route, id, action) {
        if (route != 'project' || !action) {
            return;
        }
        self.trigger('ringform_clear');
    }

    self.on('route', onRoute);
};
