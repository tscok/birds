var riot = require('riot');
var fbRef = require('../../../firebase');

module.exports = function() {
    riot.observable(this);

    var self = this;

    function init(route, id, action) {
        if (route != 'project' && !id && !action) {
            return;
        }

        // Reset ringform.
        self.trigger('ringform_reset');
    }

    function save(type, data) {
        console.log('saving', type, 'data', data);
    }

    self.on('route', init);
    self.on('ringform_save', save);
};
