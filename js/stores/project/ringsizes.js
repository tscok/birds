var riot = require('riot');
var firebase = require('firebase');

module.exports = function() {
    riot.observable(this);

    var self = this;
    var fbRef = new firebase('https://bluebird.firebaseio.com/');

    function addRingSize(data) {
        /**
         * Because commas are stored in memory as periods, which aren't
         * allowed in firebase keys, find and replace any occurance of
         * unicode period with unicode comma.
         * 
         * "Comma and period as decimal marks"
         * https://www.aeyoun.com/posts/html5-input-number-localization.html
         */
        var regex = /\u002E/; // Unicode period.
        var comma = '\u002C'; // Unicode comma.
        var size = data.ringSize.replace(regex, comma);

        fbRef.child('ringsize/' + data.pid).push({size: size, id: data.ringId});
    }

    function listRingSizes(pid) {
        fbRef.child('ringsize/' + pid).orderByChild('size').on('value', function(snap) {
            var list = [];
            snap.forEach(function(childSnap) {
                list.push({size: childSnap.val().size, id: childSnap.val().id});
            });
            self.trigger('ringsizes_listed', list)
        });
    }

    self.on('ringsizes_add', addRingSize);

    self.on('list_ringsizes', listRingSizes);
};