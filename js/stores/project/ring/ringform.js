var riot = require('riot');
var xhr = require('xhr');
var fbRef = require('../../../firebase');

module.exports = function() {
    riot.observable(this);

    var self = this, ringsizeRef, species, matches;
    var headers = ['Artkod','ENnamn','SVnamn','VetNamn'];

    function init() {
        self.trigger('ringform_clear');

        loadSpecies();
    }

    function loadSpecies() {
        if (species) {
            return;
        }

        var xhrOptions = {
            uri: './artlista.min.json',
            headers: {'Content-Type':'application/json'},
            json: {}
        };

        xhr(xhrOptions, function(err, resp, body) {
            if (!err && resp.statusCode == 200 && body) {
                species = body;
            }
        });
    }

    function matchSpecies(fragment) {
        matches = [];
        var pattern = new RegExp(fragment, 'i');
        for (var i = 0; i < species.length; i++) {
            for (var x = 0; x < headers.length; x++) {
                if (pattern.test(species[i][headers[x]])) {
                    matches.push(species[i]);
                    continue;
                }
            };
        };
        self.trigger('ringform_species_data', matches.slice(0,5));
    }

    function onRoute(route, id, action) {
        if (route != 'project' || !action) {
            return;
        }
        init();
    }

    self.on('route', onRoute);
    self.on('ringform_species', matchSpecies);
};
