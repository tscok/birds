var riot = require('riot');
var fbRef = require('../../firebase');
var agent = require('superagent');

module.exports = function() {
    riot.observable(this);

    var self = this, ringsize, species;
    
    function init(route, id, action) {
        if (route != 'project' || action != 'newring') {
            return;
        }

        // List ringsizes.
        ringsize = [];
        fbRef.child('ringsize/' + id).on('value', handle);

        // Load species JSON.
        agent.get('./artlista.min.json').end(function(err, res) {
            if (!err && res.status == 200) {
                species = res.body;
            }
        });
    }

    function handle(snap) {
        var count = snap.numChildren();

        snap.forEach(function(childSnap) {
            ringsize.push(childSnap.val());

            if (count == ringsize.length) {
                self.trigger('newring_ringsize', ringsize);
            }
        });
    }

    var keys = ['Code','English','Scientific','Swedish'];
    var hits;
    function getSpecies(needle) {
        hits = [];
        var pattern = new RegExp(needle, 'i');
        for (var i = 0; i < species.length; i++) {
            for (var x = 0; x < keys.length; x++) {
                if (pattern.test(species[i][keys[x]])) {
                    hits.push(species[i]);
                    continue;
                }
            };
        };
        self.trigger('newring_species_data', hits.slice(0,5));
    }

    self.on('route', init);
    self.on('newring_species', getSpecies);
};
