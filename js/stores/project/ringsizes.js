var riot = require('riot');
var firebase = require('firebase');

module.exports = function() {
    riot.observable(this);

    var self = this, pid;
    var fbRef = new firebase('https://bluebird.firebaseio.com/');

    var onComplete = function(error) {
        if (error) {
            self.trigger('alert', {text: error, type: 'error'})
        }
    }

    function add(data) {
        fbRef.child('ringsize/' + pid).push({
            snid: data.serialNumber,
            size: data.ringSize
        }, onComplete);
    }

    function remove(data) {
        fbRef.child('ringsize/' + pid + '/' + data.id).remove(onComplete);
    }

    function list(projectId) {
        pid = projectId;
        fbRef.child('ringsize/' + pid).orderByChild('size').on('value', function(snap) {
            var list = [];
            snap.forEach(function(childSnap) {
                list.push({
                    id: childSnap.key(),
                    ringSize: childSnap.val().size,
                    serialNumber: childSnap.val().snid
                });
            });
            self.trigger('ringsizes_listed', list)
        });
    }

    self.on('ringsizes_add', add);
    self.on('ringsizes_remove', remove);
    self.on('list_ringsizes', list);
};
